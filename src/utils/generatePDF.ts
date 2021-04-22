/* eslint-disable camelcase */
import pdfMake from 'pdfmake/build/pdfmake';
import { Content, CustomTableLayout, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

import { ExperienceInput } from '@/graphql/types/graphql-global-types';
import { ResumeFormData } from '@/pages/resume/components/ResumeEditor';
import pdfFonts from '@/styles/fonts/vfs_fonts';

interface Options {
  normalFontSize: number;
  largeFontSize: number;
}

const defaultOptions: Options = {
  normalFontSize: 11,
  largeFontSize: 12,
};

pdfMake.vfs = pdfFonts;
// pdfMake.fonts = {
//   Courier: {
//     normal: 'Courier',
//     bold: 'Courier-Bold',
//     italics: 'Courier-Oblique',
//     bolditalics: 'Courier-BoldOblique',
//   },
// };

function generateResumeExperienceContent(type: string, experience: ExperienceInput[]): Content[] {
  const content: Content[] = [];

  if (experience.length > 0) {
    content.push('\n');

    const body: TableCell[][] = [];
    body.push([{
      text: type,
      bold: true,
    }]);

    experience.forEach((e, index) => {
      if (index > 0) {
        body.push([' ']);
      }

      if (e.entity || e.city || e.country) {
        body.push([{
          alignment: 'justify',
          bold: true,
          columns: [
            {
              width: '*',
              text: e.entity,
            },
            {
              width: 'auto',
              text: [e.city, e.country].filter((s) => s).join(', '),
            },
          ],
        }]);
      }

      if (e.summary || e.start_date || e.end_date) {
        body.push([{
          alignment: 'justify',
          columns: [
            {
              width: '*',
              text: e.summary,
              italics: true,
            },
            {
              width: 'auto',
              text: [e.start_date, e.end_date].filter((s) => s).join(' - '),
            },
          ],
        }]);
      }

      if (e.details.length > 0) {
        body.push([{
          ul: e.details,
        }]);
      }
    });

    content.push({
      layout: 'headerLineOnlyWithoutBorder',
      table: {
        headerRows: 1,
        widths: ['*'],
        body,
      },
    });
  }

  return content;
}

export function generateResumePDF(resume: ResumeFormData, options: Options = defaultOptions): void {
  const { normalFontSize, largeFontSize } = options;

  const content: Content = [];

  if (resume.name || resume.english_name) {
    content.push({
      text: [resume.name, resume.english_name].filter((s) => s).join(', '),
      fontSize: largeFontSize,
      bold: true,
      alignment: 'center',
    });
  }

  if (resume.phone || resume.email) {
    const text: Content = [];
    if (resume.phone) {
      text.push({
        text: 'Phone: ',
        bold: true,
      });
      text.push(resume.phone);
    }
    if (resume.phone && resume.email) {
      text.push(', ');
    }
    if (resume.email) {
      text.push({
        text: 'Email: ',
        bold: true,
      });
      text.push(resume.email);
    }
    content.push({
      text,
      alignment: 'center',
    });
  }

  if (resume.address) {
    content.push({
      text: [
        {
          text: 'Address: ',
          bold: true,
        },
        resume.address,
      ],
      alignment: 'center',
    });
  }

  content.push(...(generateResumeExperienceContent('EDUCATION', resume.education)));
  content.push(...generateResumeExperienceContent('PROFESSIONAL EXPERIENCE', resume.professional_experience));
  content.push(...generateResumeExperienceContent('LEADERSHIP & EXTRACURRICULAR ACTIVITIES', resume.leadership_experience));

  if (resume.others.length > 0) {
    content.push('\n');
    content.push({
      layout: 'headerLineOnlyWithoutBorder',
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [
            {
              text: 'Others',
              bold: true,
            },
          ],
          ...resume.others.map((skill) => {
            const text: Content = [];
            if (skill.key) {
              text.push({
                text: `${skill.key}: `,
                bold: true,
              });
            }
            text.push(skill.value);
            return [{ text }];
          }),
        ],
      },
    });
  }

  const docDefinition: TDocumentDefinitions = {
    content,
    defaultStyle: {
      columnGap: 24,
      fontSize: normalFontSize,
    },
  };

  const tableLayouts: { [key: string]: CustomTableLayout } = {
    headerLineOnlyWithoutBorder: {
      hLineWidth: (i, node) => {
        if (i === node.table.headerRows) {
          return 1;
        } else {
          return 0;
        }
      },
      vLineWidth: () => 0,
      hLineColor: () => 'black',
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },
  };

  pdfMake.createPdf(docDefinition, tableLayouts).open();
}
