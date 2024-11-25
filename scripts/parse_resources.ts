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

  const defaultIcons: Record<string, string> = {
    'GitHub Repositories': '/icons/github.svg',
    'Data Processing Tools': '/icons/database.svg',
    'Open Source Apps / Projects': '/icons/app.svg',
    'Datasets': '/icons/table.svg',
    'Open Source Models': '/icons/box.svg',
    'LLM Leaderboards': '/icons/trophy.svg',
    'LLM Communities': '/icons/users.svg',
    'LLM Deployment': '/icons/cloud.svg',
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Parse category headers (### Category Name)
    if (line.startsWith('### ')) {
      currentCategory = line.replace('### ', '').trim();
      // Get description from the next non-empty line
      let j = i + 1;
      while (j < lines.length && !lines[j].trim() || lines[j].trim().startsWith('[')) j++;
      currentDescription = lines[j]?.trim() || '';
      continue;
    }

    // Parse resource links (numbered or bullet points)
    if (/^(\d+\.|-)/.test(line)) {
      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [, title, url] = linkMatch;
        resources.push({
          title,
          url,
          description: currentDescription,
          category: currentCategory,
          icon_url: defaultIcons[currentCategory] || '/icons/link.svg'
        });
      }
    }
  }

  return resources;
}

// Export the parsed resources
export const parsedResources = parseResourcesMd();
