/* eslint-disable camelcase */
import pdfMake from 'pdfmake/build/pdfmake';
import { Alignment, Content, CustomTableLayout, Margins, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

import { ExperienceInput } from '@/graphql/types/graphql-global-types';
import { ResumeFormData } from '@/pages/resume/components/ResumeEditor';
import pdfFonts from '@/styles/fonts/vfs_fonts';
import { splitStringByNewline } from '@/utils/stringUtil';

pdfMake.vfs = pdfFonts;
pdfMake.fonts = {
  Arial: {
    normal: 'Arial.ttf',
    bold: 'Arial-Bold.ttf',
    italics: 'Arial-Italic.ttf',
  },
  // Calibri: {
  //   normal: 'Calibri.ttf',
  //   bold: 'Calibri-Bold.ttf',
  //   italics: 'Calibri-Italic.ttf',
  // },
  ['Times New Roman']: {
    normal: 'TimesNewRoman.ttf',
    bold: 'TimesNewRoman-Bold.ttf',
    italics: 'TimesNewRoman-Italic.ttf',
  },
};

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

      if (e.details) {
        body.push([{
          ul: splitStringByNewline(e.details),
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

export function generateResumePDF(resume: ResumeFormData): void {
  const { font_family, font_size, line_height, margin } = resume.styles;
  const header_alignment = resume.styles.header_alignment as Alignment;
  const font_size_name = font_size + 1;

  const content: Content = [];

  if (resume.name || resume.english_name) {
    content.push({
      text: [resume.name, resume.english_name].filter((s) => s).join(', '),
      fontSize: font_size_name,
      bold: true,
      alignment: header_alignment,
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
      alignment: header_alignment,
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
      alignment: header_alignment,
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
    pageSize: { width: 595, height: 842 },
    pageMargins: margin.split(' ').map((m) => +m) as Margins,
    content,
    defaultStyle: {
      font: font_family,
      columnGap: 24,
      fontSize: font_size,
      lineHeight: line_height,
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
