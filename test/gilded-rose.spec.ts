import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Aged Brie ', function () {

    let gildedRose: GildedRose;

    before(function () {
        gildedRose = new GildedRose([new Item('Aged Brie', 10, 45)]);
    })


    it('I expect the Aged Brie quality to increase after one day', function() {
        const items = gildedRose.updateQuality();
        const agedBrieCheese: Item = new Item('Aged Brie', 9, 46);
        expect(agedBrieCheese.quality).to.eql(gildedRose.items[0].quality);
        expect(agedBrieCheese.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the quality of the brie to not exceed 50 after 6 days', function (){
        const items = gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        const agedBrieCheese: Item = new Item('Aged Brie', 4, 50);

        expect(agedBrieCheese.quality).to.eql(gildedRose.items[0].quality);
        expect(agedBrieCheese.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the Aged Brie quality to not decrease even when it sell by date passed', function() {
        const items = gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        const agedBrieCheese: Item = new Item('Aged Brie', -1, 50);
        expect(agedBrieCheese.quality).to.eql(gildedRose.items[0].quality);
        expect(agedBrieCheese.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

});

describe('Backstage Passes', function () {

    let gildedRose: GildedRose;

    before(function () {
        gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    })


    it('I expect the Backstage passes quality to increase after one day', function() {
        const items = gildedRose.updateQuality();
        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 14, 11);
        expect(passesAfterOneDay.quality).to.eql(gildedRose.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the quality of the Backstage passes to increase by 2 in the final 10 days', function (){
        const items = gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 17); // 17 = 10 + 5(after the first 5 days) + 2 (10th day till concert)

        expect(passesAfterOneDay.quality).to.eql(gildedRose.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the Backstage passes quality to increase by 3 in the final 5 days', function() {
        const items = gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 28); // 28 = 10 + 5(after the first 5 days) + 5*2(days 10-6) + 3 (fifth final day)

        expect(passesAfterOneDay.quality).to.eql(gildedRose.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the Backstage passes quality to drop to 0 after the concert', function() {
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0);

        expect(passesAfterOneDay.quality).to.eql(gildedRose.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the Backstage passes quality to remain 0 after the concert', function() {
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', -3, 0);

        expect(passesAfterOneDay.quality).to.eql(gildedRose.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose.items[0].sellIn);
    });

    it('I expect the Backstage passes quality to not increase over 50', function() {
        const gildedRose2 = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 35)]);
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();
        gildedRose2.updateQuality();

        const passesAfterOneDay: Item = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50);

        expect(passesAfterOneDay.quality).to.eql(gildedRose2.items[0].quality);
        expect(passesAfterOneDay.sellIn).to.eql(gildedRose2.items[0].sellIn);
    });

});

