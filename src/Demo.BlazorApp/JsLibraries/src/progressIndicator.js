import * as React from 'react';
import ReactDOM from 'react-dom';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

export function renderUICounter(count) {
    const Progress = () => React.createElement(
        ProgressIndicator,
        {
            'label': 'React Counter',
            'description': count,
            'percentComplete': (count % 10) * 0.1
        },
        null
    );

    ReactDOM.render(Progress(), document.getElementById('reactUICounter'));
}
