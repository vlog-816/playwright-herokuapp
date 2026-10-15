import { test, expect } from '../fixtures/haroku.fixture.ts';

test.describe('Table 1', () => {
    test('Validate largest person from table 1', async ({ tablePage }) => {

        const dueList = await tablePage.getTableData(1);
        const maxPerson = tablePage.maxDuePerson(dueList);

        expect(maxPerson).toStrictEqual(['Doe']);
    })

    test('Validate smallest due person in table 1', async ({ tablePage }) => {

        const dueList = await tablePage.getTableData(1);
        const minPerson = tablePage.minDuePerson(dueList);

        expect(minPerson).toStrictEqual(['Smith', 'Conway']);
    })
})

test.describe('Table 2', () => {

    test('Validate largest due person in table 2', async ({ tablePage }) => {

        const dueList = await tablePage.getTableData(2);
        const maxPerson = tablePage.maxDuePerson(dueList);

        expect(maxPerson).toStrictEqual(['Doe']);
    })

    test('Validate smallest due person in table 2', async ({ tablePage }) => {

        const dueList = await tablePage.getTableData(2);
        const maxPerson = tablePage.minDuePerson(dueList);

        expect(maxPerson).toStrictEqual(['Smith', 'Conway']);
    })
})



