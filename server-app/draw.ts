import { Canvas } from './canvas';
/**
 * Helper method which parses a given command and executed the relevant method of the 
 * Canvas class. If the command is not one of our relevant Canvas methods, we simply return.
 * @param command Command parsed from socket data
 * @param canvas Canvas upon which we are executing our command
 */
export const draw = (command: string, canvas: Canvas) => {
    const commands = command.split(' ');
    const methodName = commands[0], parameter = commands[1];
    let param;
    if (!parameter) {
        param = 1;
    } else {
        param = parseInt(parameter);
    }
    switch(methodName) {
        case 'coord':
            return canvas['coord']();
        case 'steps':
            return canvas['steps'](param);
        case 'right':
            return canvas['right'](param);
        case 'left':
            return canvas['left'](param);
        case 'render':
            return canvas['render']();
        case 'clear':
            return canvas['clear']();
        case 'hover':
            return canvas['hover']();
        case 'draw':
            return canvas['draw']();
        case 'eraser':
            return canvas['eraser']();
        default:
            return;
    }
}
