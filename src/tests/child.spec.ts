import {test, expect} from '../fixtures/BaseTest';

test("Verify No Work Available", async({page}) => {
    
    await page.goto('/eccs');

    const importMenu = page.locator('#navbarDropdownMenuLink').first();

    await importMenu.hover();

    await importMenu.getByRole('link', { name: 'IMPORT' });
    await importMenu.getByRole('link', { name: 'Manual Filing -' })

    await importMenu.locator('ul li ul li a').first().click();
     
    const headingECM =  await page.locator('.pageheader').textContent();

    console.log(`Heading: ${headingECM}`);

    expect(headingECM).toBe('Express Cargo Manifest (ECM) Filing - Document ');
})



