import React from 'react';
import { create } from 'react-test-renderer';
import Repository from '../Repository';

describe('Repository', async () => {
    it('Matches the snapshot', () => {
        const testRenderer = create(<Repository />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});