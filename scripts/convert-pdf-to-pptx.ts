import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { pdf } from 'pdf-to-img';
import PptxGenJS from 'pptxgenjs';

const PDF_PATH = path.join(process.cwd(), 'Metron_Ventures_Intelligence_Powered.pdf');
const OUTPUT_PATH = path.join(process.cwd(), 'Metron_Ventures_Intelligence_Powered.pptx');
const DESKTOP_PATH = path.join(os.homedir(), 'Desktop');

// Find the logo file on the desktop
function findLogoFile(): string | null {
  const baseName = 'Logo Metron 1';
  const extensions = ['.png', '.jpg', '.jpeg', '.svg'];
  
  if (!fs.existsSync(DESKTOP_PATH)) {
    console.warn(`⚠️  Desktop folder not found at: ${DESKTOP_PATH}`);
    return null;
  }

  for (const ext of extensions) {
    const logoPath = path.join(DESKTOP_PATH, `${baseName}${ext}`);
    if (fs.existsSync(logoPath)) {
      return logoPath;
    }
  }

  return null;
}

async function convertPdfToPptx() {
  console.log('Reading PDF...');
  
  const document = await pdf(PDF_PATH, { scale: 2.0 });
  
  const pptx = new PptxGenJS();
  
  // Set slide dimensions to match PDF (1376x768)
  pptx.defineLayout({ name: 'CUSTOM', width: 13.76, height: 7.68 });
  pptx.layout = 'CUSTOM';
  
  // Find logo file on desktop
  const logoPath = findLogoFile();
  let logoData: Buffer | null = null;
  
  if (logoPath) {
    logoData = fs.readFileSync(logoPath);
    console.log(`✅ Logo found: ${logoPath}`);
  } else {
    console.warn('⚠️  Logo "Logo Metron 1" not found on Desktop.');
    console.warn('   Please ensure the file is on your Desktop with one of these extensions: .png, .jpg, .jpeg, .svg');
    console.warn('   Slides will be created without logo.');
  }
  
  let pageNum = 0;
  for await (const image of document) {
    pageNum++;
    console.log(`Processing page ${pageNum}...`);
    
    // Create slide
    const slide = pptx.addSlide();
    
    // Add PDF page as background image (full slide)
    const imageBase64 = image.toString('base64');
    slide.addImage({
      data: `image/png;base64,${imageBase64}`,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });
    
    // Add logo to bottom right only
    if (logoData) {
      const logoExtension = path.extname(logoPath || '').slice(1).toLowerCase() || 'png';
      const logoMimeType = logoExtension === 'jpg' || logoExtension === 'jpeg' ? 'image/jpeg' : `image/${logoExtension}`;
      const logoBase64 = logoData.toString('base64');
      slide.addImage({
        data: `${logoMimeType};base64,${logoBase64}`,
        x: 12.26,
        y: 6.8,
        w: 1.5,
        h: 0.8,
        sizing: { type: 'contain', w: 1.5, h: 0.8 },
      });
    }
  }
  
  console.log('Saving PPTX...');
  await pptx.writeFile({ fileName: OUTPUT_PATH });
  console.log(`✅ Conversion complete! Output: ${OUTPUT_PATH}`);
}

convertPdfToPptx().catch(console.error);
