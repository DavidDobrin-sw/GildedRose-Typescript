import { Item, GildedRose } from '../app/gilded-rose';
import {expect} from "chai";

// Add a master test here
describe('Golden Master test', function () {
    let gildedRose: GildedRose;

    before(function () {
         gildedRose = new GildedRose([
             new Item('eggs', 4, 8),
             new Item('bacon', 5, 10),
             new Item('Aged Brie', 30,45),
             new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20),
             new Item('Sulfuras, Hand of Ragnaros', 1000, 80),
             new Item('dog food', 30, 30),
             new Item('Aged Brie', 40,35) ]);

    })

    it('checking attributes after first day', function() {
        const items = gildedRose.updateQuality();

        const afterFirstDay: Item[] = [
            new Item('eggs', 3, 7), // -1 both
            new Item('bacon', 4, 9), // -1 both
            new Item('Aged Brie', 29,46), // -1 sellin, +1 quality
            new Item('Backstage passes to a TAFKAL80ETC concert', 19, 21), // -1 sellin, +1 quality
            new Item('Sulfuras, Hand of Ragnaros', 1000, 80), // nothing changes
            new Item('dog food', 29, 29), // -1 both
            new Item('Aged Brie', 39,36) ]; // -1 sellin, +1 quality


        expect(items).to.eql(afterFirstDay);
    });

    it('checking attributes after 5 days', function() {
        let items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();

        const afterFiveDays: Item[] = [
            new Item('eggs', -1, 2), // quality goes -4 for the first 4 days and then -2 because  sellin date has passed
            new Item('bacon', 0, 5), // -5 both
            new Item('Aged Brie', 25,50), // -5 sellin, +5 quality
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 25), // -5 sellin, +5 quality
            new Item('Sulfuras, Hand of Ragnaros', 1000, 80), // nothing changes
            new Item('dog food', 25, 25), // -5 both
            new Item('Aged Brie', 35,40) ]; // -5 sellin, +5 quality


        expect(items).to.eql(afterFiveDays);
    });

    it('checking attributes after 10 days', function() {
        let items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();

        const afterTenDays: Item[] = [
            new Item('eggs', -6, 0), // quality goes 0 because it can't be negative
            new Item('bacon', -5, 0), // same as eggs
            new Item('Aged Brie', 20,50), // -5 sellin, +5 quality, it should have been +10 but 50 is maximum quality
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30), // -10 sellin, +10 quality
            new Item('Sulfuras, Hand of Ragnaros', 1000, 80), // nothing changes
            new Item('dog food', 20, 20), // -10 both
            new Item('Aged Brie', 30,45) ]; // -10 sellin, +10 quality


        expect(items).to.eql(afterTenDays);
    });

    it('checking attributes for Backstage Passes in final days', function() {
        let items = gildedRose.updateQuality();
        items = gildedRose.updateQuality(); // 12 days

        const tickets:Item = new Item('Backstage passes to a TAFKAL80ETC concert', 8, 34); // + 10 and then +2*2 because it enters the last 10 days
        expect(items[3].quality).to.eql(tickets.quality);
        expect(items[3].sellIn).to.eql(tickets.sellIn);

        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();

        const tickets2:Item = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 43); // + 10 and then +5*2 because it enters the last 10 days + 3 for last 5 days
        expect(items[3].quality).to.eql(tickets2.quality);
        expect(items[3].sellIn).to.eql(tickets2.sellIn);

        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();
        items = gildedRose.updateQuality();

        const tickets3:Item = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0); // quality 0 after the concert
        expect(items[3].quality).to.eql(tickets3.quality);
        expect(items[3].sellIn).to.eql(tickets3.sellIn);

    });

});
