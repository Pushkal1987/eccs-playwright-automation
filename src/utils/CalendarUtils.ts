import { Locator, expect } from '@playwright/test'; 
import { Logger } from './LoggerUtils'; 
 
export class CalendarUtils { 
 
    private static readonly monthNameMap: Record<string, string> = { 
        'jan': '0', 'january': '0', 
        'feb': '1', 'february': '1', 
        'mar': '2', 'march': '2', 
        'apr': '3', 'april': '3', 
        'may': '4', 
        'jun': '5', 'june': '5', 
        'jul': '6', 'july': '6', 
        'aug': '7', 'august': '7', 
        'sep': '8', 'sept': '8', 'september': '8', 
        'oct': '9', 'october': '9', 
        'nov': '10', 'november': '10', 
        'dec': '11', 'december': '11' 
    }; 
 
    static normalizeMonth(month: string): string { 
        const monthValue = this.monthNameMap[month.trim().toLowerCase()]; 
        if (monthValue) { 
            return monthValue; 
        } 
 
        const numericMonth = Number(month); 
        if (!Number.isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12) { 
            return String(numericMonth - 1); 
        } 
 
        return month; 
    } 
 
    static validateDateShape(value: string): boolean { 
        const datePattern = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; 
        return datePattern.test(value.trim()); 
    } 
 
    static async selectDateFromCalendar( 
        calendarInput: Locator, 
        calendarContainer: Locator, 
        targetYear: Locator, 
        targetMonth: Locator, 
        targetDate: Locator, 
        year: string, 
        month: string, 
        date: string 
    ): Promise<void> { 
 
        if (!year?.trim() || !month?.trim() || !date?.trim()) { 
            throw new Error('A valid year, month and date are required to select a calendar date'); 
        } 
 
        Logger.info(`Selecting date from calendar: ${date}/${month}/${year}`); 
 
        await calendarInput.click(); 
        await calendarContainer.waitFor({ 
            state: 'visible', 
            timeout: 5000 
        }); 
 
        await targetYear.selectOption(year.trim()); 
        Logger.info(`Selected year: ${year}`); 
 
        const normalizedMonth = CalendarUtils.normalizeMonth(month); 
        await targetMonth.selectOption(normalizedMonth); 
        Logger.info(`Selected month: ${month} => ${Number (normalizedMonth) +1}`); 
 
        const count = await targetDate.count(); 
        Logger.info(`Total date elements found: ${count}`); 
 
        let selectedDateClicked = false; 
 
        for (let i = 0; i < count; i++) { 
            const dateText = await targetDate.nth(i).textContent(); 
 
            if (dateText?.trim() === date.trim()) { 
                Logger.info(`Clicking date: ${date}`); 
                await targetDate.nth(i).click(); 
                selectedDateClicked = true; 
                break; 
            } 
        } 
 
        if (!selectedDateClicked) { 
            throw new Error(`Date "${date}" was not found in the calendar`); 
        } 
    } 
 
    static async getSelectedDate( 
        dateInput: Locator 
    ): Promise<string> { 
 
        return await dateInput.inputValue(); 
    } 
 
    static async getSelectedCalendarDate( 
        calendarInput: Locator 
    ): Promise<string> { 
 
        return await calendarInput.inputValue(); 
    } 
 
    static async validateSelectedDate( 
        dateInput: Locator, 
        expectedYear: string, 
        expectedMonth: string, 
        expectedDate: string 
    ): Promise<void> { 
 
        const actualDate = await dateInput.inputValue(); 
 
        const monthMap: Record<string, string> = { 
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', 
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' 
        }; 
 
        const monthNumber = monthMap[expectedMonth] ?? this.normalizeMonth(expectedMonth); 
 
        if (!monthNumber || Number.isNaN(Number(monthNumber))) { 
            throw new Error(`Invalid month: ${expectedMonth}`); 
        } 
 
        const expectedFormattedDate = `${expectedDate.padStart(2, '0')}/${monthNumber.padStart(2, '0')}/${expectedYear}`; 
 
        Logger.info(`Expected Date: ${expectedFormattedDate}`); 
        Logger.info(`Actual Date: ${actualDate}`); 
 
        if (!this.validateDateShape(actualDate)) { 
            throw new Error(`Calendar selected value "${actualDate}" is not a valid dd/mm/yyyy value`); 
        } 
 
        expect(actualDate).toBe(expectedFormattedDate); 
    } 
} 