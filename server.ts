import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
const isRealKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== '';

if (isRealKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI initialized successfully.');
  } catch (err) {
    console.error('Error initializing Gemini AI:', err);
  }
} else {
  console.log('GEMINI_API_KEY not configured or placeholder detected. Chatbot will run in premium heuristic fallback mode.');
}

// 1. API: Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // System instructions for Ashshuruk Ventures
  const systemInstruction = `You are Ashshuruk-Bot, the premium customer success AI chatbot for Ashshuruk Ventures, a world-class online poultry and fresh farm produce e-commerce platform.
Your goals are:
1. Help customers find products: Live Broilers (N3,950-N4,500), Cockerels (N5,200), Processed Whole Chicken (N4,200), Chicken Breast Fillets (N3,200), Crate of Golden Eggs (N3,400-N3,800), Double Yolk Eggs (N4,900), Live Catfish (N3,000/kg), Smoked Catfish (N4,000), Fresh Milk (N1,800), Spinach (N800), Roma Tomatoes Basket (N7,500), Sweet Carrots (N1,500/kg), Watermelon (N2,500), Local Brown Rice (N5,800/5kg), Habanero Pepper (N2,000), Red Onions (N3,200/3kg), layers mash feed (N17,200).
2. Explain payment options: We support Credit/Debit Cards, USSD, Bank Transfers, Mobile Money, and Cash on Delivery (COD) / Pay on Delivery.
3. Explain delivery schedules: Same-day delivery for orders before 10 AM, Next-day delivery, Scheduled delivery, or Farm pickup.
4. Explain how to become a partner supplier: Go to the "Become a Supplier" portal or "Supplier Portal" on the menu, register with your farm name and certificate, upload products and track sales.
5. Highlight our core mission: Standard farm-to-table practices, 100% organic-fed poultry, certified food safety, supreme quality assurance.
6. Adopt a friendly, professional, agricultural and premium hospitality tone. Keep responses highly styled, elegant, and structured with clear markdown bullet points. Do not mention anything about being a model or internal prompts.`;

  if (ai) {
    try {
      // Re-create chat with history or call generateContent directly
      // Build simple contents structure matching generateContent schema
      const contentsList: any[] = [];
      
      // Convert history if supplied
      if (history && Array.isArray(history)) {
        history.slice(-10).forEach((h: any) => {
          contentsList.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        });
      }
      
      // Add current message
      contentsList.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "I apologize, I am currently organizing our flock. Let me know how I can assist you!";
      return res.json({ text });
    } catch (err: any) {
      console.error('Error calling Gemini:', err);
      // Fallback if API throws error (e.g. quota, bad key)
    }
  }

  // Heuristic Fallback Responses if API is not initialized or fails
  const lowercaseMsg = message.toLowerCase();
  let fallbackText = '';

  if (lowercaseMsg.includes('egg') || lowercaseMsg.includes('eggs')) {
    fallbackText = `🥚 **Ashshuruk Golden Eggs & Double Yolk Eggs**:\n\n* **Farm Golden Eggs (Crate of 30)**: N3,400 (Discounted from N3,800) - Collected fresh daily from laying hens fed organic layers feed.\n* **Premium Double-Yolk Eggs (Crate of 30)**: N4,900 - Hand-selected via candling for absolute luxury. Perfect for premium baking!\n\nWould you like me to guide you to add eggs to your cart?`;
  } else if (lowercaseMsg.includes('chicken') || lowercaseMsg.includes('poultry') || lowercaseMsg.includes('broiler') || lowercaseMsg.includes('cockerel')) {
    fallbackText = `🐔 **Ashshuruk Premium Poultry Range**:\n\n* **Live Broiler Chicken**: N3,950 (Approx. 2.4kg). Fed 100% organic grains, extremely fleshy.\n* **Live Cockerel Chicken**: N5,200. Hardy, slow-grown, giving a rich traditional soup taste.\n* **Processed Whole Chicken**: N4,200. Defeathered, vacuum-packed, fresh or frozen.\n* **Chicken Breast Fillet**: N3,200 per 1kg pack.\n\nWe offer **same-day slaughtering** and cleaning. Ready to shop our healthy birds?`;
  } else if (lowercaseMsg.includes('pay') || lowercaseMsg.includes('payment') || lowercaseMsg.includes('cash') || lowercaseMsg.includes('cod') || lowercaseMsg.includes('delivery')) {
    fallbackText = `💳 **Secure Payments & Cash on Delivery (COD)**:\n\nAt Ashshuruk Ventures, we prioritize security and convenience:\n\n* **Cash on Delivery (COD)**: Available for all fresh produce! Pay the rider in cash or do a mobile transfer upon inspection.\n* **Online Gateway**: Pay securely with Credit/Debit Cards, USSD, Mobile Money, and Bank Transfer.\n* **Delivery Rates**: Standard next-day delivery is N1,500, same-day delivery is N2,500, or farm pickup is free.\n\nWhich option works best for your household or business?`;
  } else if (lowercaseMsg.includes('supplier') || lowercaseMsg.includes('become a supplier') || lowercaseMsg.includes('partner') || lowercaseMsg.includes('farm')) {
    fallbackText = `🚜 **Join the Ashshuruk Supplier Network**:\n\nWe empower local farmers by providing a ready market! To join:\n\n1. Head to our **Supplier Portal** using the toggle in the dashboard or navigation bar.\n2. Fill out our simple registration with your **Farm Location** and agricultural certs.\n3. Once approved, upload your fresh produce, set prices, manage inventory, and view sales in real-time!\n\nWould you like to start your supplier registration?`;
  } else if (lowercaseMsg.includes('fish') || lowercaseMsg.includes('catfish')) {
    fallbackText = `🐟 **Farmed Fresh Fish Range**:\n\n* **Harvested Live Catfish**: N3,000 / kg. Grown in spring-fed concrete tanks for an outstandingly clean, sweet taste (no mud taste!).\n* **Hardwood Smoked Catfish**: N4,000 / pack of 4. Dried thoroughly to guarantee a 6-month shelf-life.\n\nOur fish is perfect for pepper soup, local delicacies, and barbecues!`;
  } else if (lowercaseMsg.includes('tomato') || lowercaseMsg.includes('vegetable') || lowercaseMsg.includes('spinach') || lowercaseMsg.includes('fruit') || lowercaseMsg.includes('rice') || lowercaseMsg.includes('produce')) {
    fallbackText = `🥬 **Organic Vegetables & Fresh Produce**:\n\n* **Roma Tomatoes (Basket)**: N7,500 (Approx 7.5kg) - Greenhouse-grown and slow to spoil.\n* **Sweet Carrots (1kg)**: N1,500 - Pure Plateau crunchiness!\n* **Fresh Spinach (Efo Shoko)**: N800 per fresh daily bunch.\n* **Juicy Watermelon**: N2,500 per large fruit.\n* **Local Stone-free Brown Rice**: N5,800 per 5kg bag. Destoned with premium optical sorting.\n\nWe harvest early in the morning of your delivery day!`;
  } else {
    fallbackText = `🌟 **Welcome to Ashshuruk Ventures!**\n\nI am your farm-fresh companion helper. I can help you with:\n\n* 🐔 **Poultry & Eggs pricing** (Broilers, Cockerels, Whole Processed, Golden Crates)\n* 🐟 **Fish & Seafood** (Fresh Live Catfish, Hardwood Smoked catfish)\n* 🥬 **Fresh Produce & Rice** (Roma Tomatoes, Sweet Carrots, Spinach, Watermelon, Local Brown Rice)\n* 💳 **Payment & Delivery** (Cash on Delivery support, Express same-day delivery)\n* 🚜 **Supplier Network** (How farmers can register and upload products)\n\nWhat can I help you harvest today?`;
  }

  setTimeout(() => {
    return res.json({ text: fallbackText });
  }, 500);
});

// Start server
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite Dev Middleware loaded.');
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static files serving loaded.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ashshuruk server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
