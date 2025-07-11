export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateAgedBrie(index: number): void{
        if (this.items[index].quality < 50) {
            this.items[index].quality = this.items[index].quality + 1;
        }
        this.items[index].sellIn = this.items[index].sellIn - 1;
    }

    updateBackStagePasses(index: number): void{
        if (this.items[index].quality < 50) {
            if(this.items[index].sellIn > 10) {
                this.items[index].quality = this.items[index].quality + 1;
            } else if (this.items[index].sellIn > 5){
                this.items[index].quality = Math.min(this.items[index].quality + 2, 50);
            } else {
                this.items[index].quality = Math.min(this.items[index].quality + 3, 50);
            }
        }

        this.items[index].sellIn = this.items[index].sellIn - 1;

        if (this.items[index].sellIn < 0) {
            this.items[index].quality = 0;
        }
    }

    updateConjuredManaCake(index: number): void{
        this.items[index].quality = Math.max(this.items[index].quality - 2, 0);

        this.items[index].sellIn = this.items[index].sellIn - 1;

        if(this.items[index].sellIn < 0) {
            this.items[index].quality = Math.max(this.items[index].quality - 2, 0);
        }
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            switch (this.items[i].name) {
                case 'Aged Brie':
                    this.updateAgedBrie(i);
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    this.updateBackStagePasses(i);
                    break;
                case 'Conjured Mana Cake':
                    this.updateConjuredManaCake(i);
                    break;
                case 'Sulfuras, Hand of Ragnaros':
                    continue;
                default:
                    if (this.items[i].quality > 0) {
                        this.items[i].quality = this.items[i].quality - 1
                    }

                    this.items[i].sellIn = this.items[i].sellIn - 1;

                    if (this.items[i].sellIn < 0) {
                        if (this.items[i].quality > 0) {
                            this.items[i].quality = this.items[i].quality - 1
                        }
                    }
                    break;
            }

        }



        return this.items;
    }
}
