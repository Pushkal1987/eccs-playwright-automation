export class DateUtils {

    private static readonly locale = 'en-GB';

    static getCurrentDate(): string {
        return new Intl.DateTimeFormat(this.locale).format(new Date());
    }

    static getCurrentTime(): string {
        return new Intl.DateTimeFormat(this.locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(new Date());
    }

    static getCurrentDateTime(): string {
        return new Intl.DateTimeFormat(this.locale, {
            dateStyle: 'short',
            timeStyle: 'medium'
        }).format(new Date());
    }

    // Returns date and time in YYYYMMDDHHMMSS format 
    static getCurrentTimestamp(): string {

        const now = new Date();

        const date = this.getCurrentDate()
            .split('/')
            .reverse()
            .join('');
        const time = this.getCurrentTime()
            .replace(/:/g, '');
        const milliseconds = String(now.getMilliseconds())
        .padStart(3, '0');

        return `${date}${time}${milliseconds}`;
    }

    static getTimestamp(): number {
        return Date.now();
    }

    static getISODate(): string {
        return new Date().toISOString();
    }

    static addDays(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    static subtractDays(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }
}