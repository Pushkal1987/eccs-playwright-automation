export function cleanErrorMessage(message: string): string { 
    return message.replace( 
        /[\u001B\u009B][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d/#&.:=?%@~_]+)*)?\u0007)|(?:(?:\d{1,4}(?:[;:]\d{0,4})*)?[a-zA-Z\d]))/g, 
        "" 
    ); 
} 