import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Resource {
  title: string;
  url: string;
  description: string;
  category: string;
  icon_url: string;
}

function parseResourcesMd(): Resource[] {
  const content = readFileSync(resolve(__dirname, '../resources.md'), 'utf-8');
  const lines = content.split('\n');
  const resources: Resource[] = [];
  let currentCategory = '';
  let currentDescription = '';

  const categoryDescriptions: { [key: string]: string } = {
    "GitHub Repositories": "Essential GitHub repositories for LLM development, training, and deployment",
    "Data Processing Tools": "Tools and utilities for processing, cleaning, and preparing LLM training data",
    "Open Source Apps / Projects": "Ready-to-use applications and implementations",
    "Datasets": "High-quality datasets and data collections for LLM training",
    "Open Source Models": "Collection of open source large language models available for research and deployment",
    "LLM Leaderboards": "Top benchmarks and leaderboards for comparing LLM performance across different tasks",
    "LLM Communities": "Active communities and forums for LLM developers, researchers, and enthusiasts",
    "LLM Deployment": "Tools, frameworks, and platforms for deploying and serving LLM applications",
    "Free Resources": "Free learning materials and resources for LLM development",
    "Video Tutorials": "Video-based learning content for LLM concepts and implementation",
    "Academic Courses": "University and professional courses on LLM development",
    "Research Papers": "Academic papers and publications on LLM research"
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse numbered resource items
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, title, url] = match;
        const description = line.split(':')[1]?.trim() || '';
        resources.push({
          title,
          url,
          description: description || currentDescription,
          category: currentCategory,
          icon_url: `/icons/${currentCategory.toLowerCase().replace(/\s+/g, '-')}.svg`
        });
      }
    }
    // Parse section headers
    else if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').split(' ')[0].trim();
      if (currentCategory === "微调") currentCategory = "Fine-Tuning";
      else if (currentCategory === "推理") currentCategory = "Inference";
      else if (currentCategory === "数据") currentCategory = "Data Processing Tools";
      
      currentDescription = categoryDescriptions[currentCategory] || '';
    }
  }

  return resources;
}

// Export the parsed resources
export const parsedResources = parseResourcesMd();
