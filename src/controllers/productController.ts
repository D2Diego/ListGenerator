import { Request, Response } from 'express';
import { openai } from '../config/openai';

const AFFILIATE_TAG = process.env.AFFILIATE_TAG || 'seu-codigo-afiliado';

export const generateProducts = async (req: Request, res: Response): Promise<void> => {
    const { prompt } = req.body;

    if (!prompt) {
        res.status(400).json({ error: 'O prompt é obrigatório' });
        return;
    }

    try {
        const gptResponse = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Gere uma lista de produtos para: ${prompt}`,
            max_tokens: 100,
        });

        const products = gptResponse.data.choices[0].text?.trim().split('\n') || [];

        const affiliateLinks = products.map((product) => ({
            name: product,
            link: `https://www.amazon.com.br/s?k=${encodeURIComponent(product)}&tag=${AFFILIATE_TAG}`,
        }));

        res.json({ products: affiliateLinks });
    } catch (error) {
        console.error('Erro ao gerar produtos:', error);
        res.status(500).json({ error: 'Erro ao gerar produtos' });
    }
};
