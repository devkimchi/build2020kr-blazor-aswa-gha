import { getHello } from './functionApi';
import { renderUICounter } from './progressIndicator';

export async function GetHello(requestUri) {
    return await getHello(requestUri);
}

export function RenderUICounter(count) {
    return renderUICounter(count);
}
