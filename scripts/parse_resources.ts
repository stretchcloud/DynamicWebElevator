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

  // Category descriptions and mappings
  const categoryDescriptions: { [key: string]: string } = {
    "Data": "Tools and methods for processing and preparing LLM training data",
    "Fine-Tuning": "Tools and frameworks for fine-tuning large language models",
    "Inference": "Frameworks and tools for LLM inference and deployment",
    "Evaluation": "Tools and methods for evaluating LLM performance",
    "Experience Usage": "Practical applications and usage examples of LLMs",
    "Knowledge BaseRAG": "Retrieval-Augmented Generation tools and implementations",
    "Agents": "LLM-powered autonomous agents and frameworks",
    "Search": "Search and retrieval tools for LLM applications",
    "Book": "Books and reading materials about LLMs",
    "Course": "Educational courses and learning resources",
    "Tutorial": "Tutorials and guides for LLM development",
    "GitHub Repositories": "Essential GitHub repositories for LLM development",
    "Open Source Apps / Projects": "Ready-to-use applications and implementations",
    "Datasets": "High-quality datasets for LLM training",
    "Open Source Models": "Collection of open source language models",
    "LLM Leaderboards": "Benchmarks for comparing LLM performance",
    "LLM Communities": "Communities and forums for LLM developers",
    "LLM Deployment": "Tools for deploying LLM applications"
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse numbered resource items
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, title, url] = match;
        // Extract description after the URL, looking for content after ): or just :
        let description = '';
        const descMatch = line.match(/\):\s*(.*?)$/) || line.match(/:\s*(.*?)$/);
        if (descMatch) {
          description = descMatch[1].trim();
        }
        
        // Only add resource if we have a valid category
        if (currentCategory && categoryDescriptions[currentCategory]) {
          resources.push({
            title,
            url,
            description: description || currentDescription,
            category: currentCategory,
            icon_url: `/icons/${currentCategory.toLowerCase().replace(/\s+/g, '-')}.svg`
          });
        }
      }
    }
    // Parse section headers
    else if (line.startsWith('## ')) {
      const headerText = line.replace('## ', '').trim();
      const categoryMapping: { [key: string]: string } = {
        "微调": "Fine-Tuning",
        "推理": "Inference",
        "数据": "Data",
        "评估": "Evaluation",
        "体验": "Experience Usage",
        "知识库": "Knowledge BaseRAG",
        "智能体": "Agents",
        "搜索": "Search",
        "书籍": "Book",
        "课程": "Course",
        "教程": "Tutorial"
      };
      
      // Extract category name from header
      let category = headerText.split(' ')[0];
      currentCategory = categoryMapping[category] || category;
      
      // Set description if available
      currentDescription = categoryDescriptions[currentCategory] || '';
    }
  }

  return resources;
}

// Export the parsed resources
export const parsedResources = parseResourcesMd();
