import { test, expect } from '@playwright/test';

test.describe('Table 1', () => {
    test('Validate largest person from table 1', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables');

        const dueList = await page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
        console.log(dueList);

        const numericDueList = dueList.map(due => Number(due.replace('$', '')));
        console.log(numericDueList);

        const maxDue = Math.max(...numericDueList);
        const maxDueIndex = numericDueList.findIndex(index => index === maxDue) + 1;
        console.log(maxDueIndex);

        const lastName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex}) td:nth-child(1)`).textContent();
        const firstName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex}) td:nth-child(2)`).textContent();

        const minPerson = lastName?.concat(' ', firstName || '');

        expect(minPerson?.trim()).toEqual('Doe Jason');
    })

    test('Validate smallest due person in table 1', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables')

        const persons = await page.locator('#table1 tbody tr').evaluateAll(rows => {

            return rows.map(row => {

                const cell = row.querySelectorAll('td');

                return {
                    lastname: cell[0]?.textContent.trim(),
                    firstname: cell[1]?.textContent.trim(),
                    email: cell[2]?.textContent.trim(),
                    due: cell[3]?.textContent.trim(),
                    website: cell[4]?.textContent.trim()
                }
            })
        })
        console.log(persons);

        const normalizedPerson = persons.map(person => {
            return {
                ...person,
                due: Number(person.due.replace('$', ''))
            }
        })
        console.log(normalizedPerson);

        const minDue = Math.min(...normalizedPerson.map(person => person.due));
        const minPerson = normalizedPerson.filter(person => person.due === minDue);
        console.log(minPerson)

        const expectedPerson = [{
            lastname: 'Smith',
            firstname: 'John',
            email: 'jsmith@gmail.com',
            due: 50,
            website: 'http://www.jsmith.com'
        },
        {
            lastname: 'Conway',
            firstname: 'Tim',
            email: 'tconway@earthlink.net',
            due: 50,
            website: 'http://www.timconway.com'
        }]

        expect(minPerson).toMatchObject(expectedPerson)
        expect(minPerson).toMatchObject([{ lastname: 'Smith' }, { lastname: 'Conway' }])
    })
})

test.describe('Table 2', () => {
    test('Validate smallest due person in table 2', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/tables');
        const dueList = await page.locator('#table2 tbody tr td:nth-child(4)').allTextContents();

        const numbericDueList = dueList.map(due => Number(due.replace('$', '')));
        const minDue = Math.min(...numbericDueList);

        const minIndexList = numbericDueList.reduce((acc, num, index) => {
            if (num === minDue) {
                acc.push(index);
            }
            return acc;
        }, [] as number[])
        console.log(minIndexList)

        const minPersons = [];
        for (const min of minIndexList) {
            const lastName = await page.locator(`#table2 tbody tr:nth-child(${min + 1}) td:nth-child(1)`).textContent();
            minPersons.push(lastName);
        }
        console.log(minPersons);

        expect(minPersons).toMatchObject(['Smith', 'Conway']);
    })
})



