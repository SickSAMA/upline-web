import classNames from 'classnames';
import React, { MouseEventHandler, MutableRefObject, useCallback, useEffect, useState } from 'react';

import { ConfirmModal } from '@/components/Modal';
import { generateResumePDF as _gen } from '@/utils/generatePDF';

import style from '../style.module.scss';
import { ResumeFormData } from './ResumeEditor';

interface PDFGeneratorButtonProps {
  resume: ResumeFormData
  text: string;
  className?: string;
  isOnePage: MutableRefObject<boolean>;
}

export default function PDFGeneratorButton({ resume, className, text, isOnePage }: PDFGeneratorButtonProps): JSX.Element {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [generateResumePDF, setGenerateResumePDF] = useState<(resume: ResumeFormData) => void>();

  useEffect(() => {
    if (isGeneratingPDF && generateResumePDF) {
      setIsGeneratingPDF(false);
      generateResumePDF(resume);
    }
  }, [isGeneratingPDF, resume, generateResumePDF]);

  // Dynamically load pdf generator
  const loadPDFGenerator: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (!generateResumePDF) {
      const _generateResumePDF = (await import('@/utils/generatePDF')).generateResumePDF;
      // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
      setGenerateResumePDF(() => _generateResumePDF);
    }
  };

  const generatePDF = useCallback(() => {
    if (generateResumePDF) {
      generateResumePDF(resume);
    } else {
      setIsGeneratingPDF(true);
    }
  }, [resume, generateResumePDF]);

  const onGeneratePDF: MouseEventHandler = (e) => {
    e.preventDefault();
    _gen(resume);
    return;
    if (isOnePage.current) {
      generatePDF();
    } else {
      setIsWarningModalOpen(true);
    }
  };

  const onWarningCancel: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsWarningModalOpen(false);
  }, []);

  const onWarningContinue: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsWarningModalOpen(false);
    generatePDF();
  }, [generatePDF]);

  return (
    <div className={classNames(className, { [style.isGeneratingPDF]: isGeneratingPDF })}>
      <button
        type="button"
        onClick={onGeneratePDF}
        onMouseEnter={loadPDFGenerator}
        disabled={isGeneratingPDF}
      >
        { text }
      </button>
      <ConfirmModal
        isOpen={isWarningModalOpen}
        message="Your resume exceeds one page, which is against the best practice. Are you sure you want to continue?"
        emphasis="cancel"
        onCancel={onWarningCancel}
        onContinue={onWarningContinue}
      />
    </div>
  );
}
