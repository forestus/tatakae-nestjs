import { Injectable } from '@nestjs/common';
import malScraper from 'mal-scraper';
@Injectable()
export class GetDescriptionByNameService {
  private descriptions: any[] = [];
  private element = [];

  async findByName(anime: string, maxResults: number): Promise<any> {
    const baseDescription = await malScraper.getResultsFromSearch(anime);
    const dataUrl = baseDescription.map((anime) => {
      return anime.url;
    });
    await Promise.all(
      dataUrl.map(async (url) => {
        const {
          title,
          episodes,
          picture,
          score,
          aired,
          status,
          genres,
          synopsis,
        } = await malScraper.getInfoFromURL(url);
        this.descriptions.push({
          name: title.replace('☆', ' '),
          episodes,
          picture,
          score,
          aired,
          status,
          genres,
          synopsys: synopsis, // verificar
        });
        return this.descriptions;
      }),
    );
    this.element.filter((e) => e !== undefined && e !== null);
    if (maxResults) {
      for (let i = 0; i < maxResults; i++) {
        this.element.push(this.descriptions[i]);
      }
      return this.element;
    }
    return this.descriptions;
  }
}
