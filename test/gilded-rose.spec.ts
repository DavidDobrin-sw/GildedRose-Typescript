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

