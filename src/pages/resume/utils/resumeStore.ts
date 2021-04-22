import { ResumeFormData } from '../components/ResumeEditor';

export interface ResumeStorageData extends ResumeFormData {
  updated_at: string; // eslint-disable-line
}

interface ResumeStore {
  queue: string[];
  resumes: {
    [uuid: string]: ResumeStorageData;
  }
}

const RESUME_KEY = 'resume';
const STORE_SIZE = 10;

export function loadResume(uuid = 'default'): ResumeStorageData | undefined {
  const rawData = localStorage.getItem(RESUME_KEY);

  // resume never saved
  if (rawData === null) {
    return undefined;
  }

  const resumeStore: ResumeStore = JSON.parse(rawData);
  return resumeStore.resumes[uuid];
}

export function saveResume(resume: ResumeFormData): void {
  const rawData = localStorage.getItem(RESUME_KEY);

  let resumeStore: ResumeStore;
  if (rawData === null) {
    resumeStore = {
      queue: [],
      resumes: {},
    };
  } else {
    resumeStore = JSON.parse(rawData);
  }

  let uuid = 'default';
  if (resume.uuid) {
    uuid = resume.uuid;
  }

  const queue = resumeStore.queue;
  if (resumeStore.resumes[uuid]) {
    resumeStore.resumes[uuid] = {
      ...resume,
      updated_at: new Date().toISOString(),
    };
    // update queue
    const index = queue.indexOf(uuid);
    if (index > -1) {
      queue.push(queue.splice(index, 1)[0]);
    } else {
      queue.push(uuid);
    }
  } else {
    // remove oldest resume
    while (queue.length >= STORE_SIZE) {
      const uuidRemvoed = queue.shift();
      if (uuidRemvoed && resumeStore.resumes[uuidRemvoed]) {
        delete resumeStore.resumes[uuidRemvoed];
      }
    }

    queue.push(uuid);
    resumeStore.resumes[uuid] = {
      ...resume,
      updated_at: new Date().toISOString(),
    };
  }

  localStorage.setItem(RESUME_KEY, JSON.stringify(resumeStore));
}

export function deleteResume(uuid = 'default'): void {
  const rawData = localStorage.getItem(RESUME_KEY);

  if (rawData !== null) {
    const resumeStore: ResumeStore = JSON.parse(rawData);
    // remove uuid from queue
    const queue = resumeStore.queue;
    const index = queue.indexOf(uuid);
    if (index > -1) {
      queue.splice(index, 1);
    }
    // remove uuid from resumes
    if (resumeStore.resumes[uuid]) {
      delete resumeStore.resumes[uuid];
    }

    localStorage.setItem(RESUME_KEY, JSON.stringify(resumeStore));
  }
}
