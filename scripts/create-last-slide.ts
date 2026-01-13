import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { pdf } from 'pdf-to-img';
import PptxGenJS from 'pptxgenjs';
import sharp from 'sharp';

const PDF_PATH = path.join(process.cwd(), 'Metron_Ventures_Intelligence_Powered.pdf');
const DESKTOP_PATH = path.join(os.homedir(), 'Desktop');
const OUTPUT_PATH = path.join(DESKTOP_PATH, 'FINAL NEW METRON.pptx');

// Find the LAST LOGO.JPG file on the desktop
function findLastLogoFile(): string | null {
  const logoPath = path.join(DESKTOP_PATH, 'LAST LOGO.JPG');
  
  if (!fs.existsSync(DESKTOP_PATH)) {
    console.warn(`⚠️  Desktop folder not found at: ${DESKTOP_PATH}`);
    return null;
  }

  if (fs.existsSync(logoPath)) {
    return logoPath;
  }

  // Try case variations
  const variations = [
    'LAST LOGO.jpg',
    'LAST LOGO.jpeg',
    'last logo.jpg',
    'Last Logo.jpg'
  ];
  
  for (const variation of variations) {
    const altPath = path.join(DESKTOP_PATH, variation);
    if (fs.existsSync(altPath)) {
      return altPath;
    }
  }

  return null;
}

// Process logo for optimal readability and visual appeal
// Applying timeless design principles: proper sizing, contrast, clarity
async function processLogoForSlide(logoPath: string): Promise<Buffer> {
  const metadata = await sharp(logoPath).metadata();
  
  // Resize to optimal size for slide (max 2 inches width, maintaining aspect ratio)
  // Slide is 13.76 inches wide, so 2 inches = ~14.5% of width
  const maxWidth = 1200; // pixels at 2x scale
  const maxHeight = 1200;
  
  let processed = sharp(logoPath);
  
  // Resize if needed, maintaining aspect ratio
  if (metadata.width && metadata.width > maxWidth) {
    processed = processed.resize(maxWidth, null, {
      fit: 'inside',
      withoutEnlargement: true
    });
  } else if (metadata.height && metadata.height > maxHeight) {
    processed = processed.resize(null, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }
  
  // Enhance for readability: slight sharpening and contrast adjustment
  return await processed
    .sharpen(0.5, 1, 2)
    .modulate({ brightness: 1.05, saturation: 1.1 }) // Slight brightness and saturation boost
    .png()
    .toBuffer();
}

async function createLastSlide() {
  console.log('Reading PDF...');
  
  const document = await pdf(PDF_PATH, { scale: 2.0 });
  
  // Collect all pages to get the last one
  const pages: Buffer[] = [];
  for await (const image of document) {
    pages.push(image);
  }
  
  const lastPage = pages[pages.length - 1];
  console.log(`Processing last slide (page ${pages.length})...`);
  
  const pptx = new PptxGenJS();
  
  // Set slide dimensions to match PDF (1376x768)
  pptx.defineLayout({ name: 'CUSTOM', width: 13.76, height: 7.68 });
  pptx.layout = 'CUSTOM';
  
  // Find and process LAST LOGO.JPG
  const logoPath = findLastLogoFile();
  let processedLogoData: Buffer | null = null;
  
  if (logoPath) {
    console.log(`✅ LAST LOGO.JPG found: ${logoPath}`);
    try {
      processedLogoData = await processLogoForSlide(logoPath);
      console.log('✅ Logo processed for optimal readability');
    } catch (error) {
      console.error('❌ Error processing logo:', error);
      return;
    }
  } else {
    console.error('❌ "LAST LOGO.JPG" not found on Desktop.');
    console.error('   Please ensure the file exists on your Desktop.');
    return;
  }
  
  // Create slide
  const slide = pptx.addSlide();
  
  // Add PDF page as background image (full slide)
  const imageBase64 = lastPage.toString('base64');
  slide.addImage({
    data: `image/png;base64,${imageBase64}`,
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
  });
  
  // Apply timeless design principles for readability:
  // - Balanced composition (rule of thirds)
  // - Clear visual hierarchy
  // - Proper contrast and spacing
  // - Professional placement
  
  // Replace brown square with processed logo
  // Positioned for optimal visual balance and readability
  if (processedLogoData) {
    const logoBase64 = processedLogoData.toString('base64');
    
    // Get logo dimensions to calculate proper size
    const logoMetadata = await sharp(processedLogoData).metadata();
    const logoAspectRatio = logoMetadata.width && logoMetadata.height 
      ? logoMetadata.width / logoMetadata.height 
      : 1;
    
    // Size: approximately 2 inches wide (maintains aspect ratio)
    // Position: centered horizontally, slightly above center vertically (rule of thirds)
    const logoWidth = 2.0;
    const logoHeight = logoWidth / logoAspectRatio;
    const logoX = (13.76 - logoWidth) / 2; // Center horizontally
    const logoY = 3.0; // Slightly above center for visual balance
    
    slide.addImage({
      data: `image/png;base64,${logoBase64}`,
      x: logoX,
      y: logoY,
      w: logoWidth,
      h: logoHeight,
      sizing: { type: 'contain', w: logoWidth, h: logoHeight },
    });
    console.log(`✅ Added processed logo (${logoWidth}" × ${logoHeight.toFixed(2)}") with timeless design principles`);
  }
  
  console.log('Saving PPTX to Desktop...');
  await pptx.writeFile({ fileName: OUTPUT_PATH });
  console.log(`✅ Complete! File saved: ${OUTPUT_PATH}`);
}

createLastSlide().catch(console.error);
