import { RowData } from './TablePage.page';
import { Page, Locator } from '@playwright/test';

export type RowData = {
    lastname: string,
    firstname: string,
    email: string,
    due: number,
    website: string
}
export class TablePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    async getTableData(index: number): Promise<RowData[]> {
        const persons = await this.page.locator(`#table${index} tbody tr`).evaluateAll(rows => {

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

        const normalizedPerson = persons.map(person => {
            return {
                ...person,
                due: Number(person.due.replace('$', ''))
            }
        })

        return normalizedPerson
    }

    maxDuePerson(tableData: RowData[]) {
        const maxDue = Math.max(...tableData.map(rowPerson => rowPerson.due));
        const maxPerson = tableData.filter(rowPerson => rowPerson.due === maxDue).map(rowPerson => rowPerson.lastname);

        return maxPerson
    }

    minDuePerson(tableData: RowData[]) {
        const minDue = Math.min(...tableData.map(rowPerson => rowPerson.due));
        const minPerson = tableData.filter(rowPerson => rowPerson.due === minDue).map(rowPerson => rowPerson.lastname);

        return minPerson
    }
}