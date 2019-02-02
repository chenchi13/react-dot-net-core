import * as React from 'react';
const style = require('./style.css');

interface ModaleDataState {
    show: boolean;
}

export class Modal extends React.Component<any, ModaleDataState> {
    render() {

        if (!this.props.show) {
            return null;
        }

        return <div className="modal-background">
            <div className="modal-main">
                {this.props.children}
            </div>
       </div>
    }
}