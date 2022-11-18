import { expect } from 'chai';
import { syncTrue, asyncTrue } from '../src/index';

describe('bar', () => {
    it('sync function returns true', () => {
        const result = syncTrue();
        expect(result).to.be.true;
    });

    it('async function returns true', async () => {
        const result = await asyncTrue();
        expect(result).to.be.true;
    });
});