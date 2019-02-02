import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { AddNaselje } from './AddNaselje';
import { Modal } from './Modal/Modal';
var ReactDOM = require('react-dom');

interface FetchNaseljeDataState {
    nasList: NaseljeData[];
    loading: boolean;
    showModal: boolean
    nas_id: number;
}

export class FetchNaselje extends React.Component<RouteComponentProps<{}>, FetchNaseljeDataState> {
    addNaseljeComponent: any;
    constructor() {
        super();
        this.state = { nasList: [], loading: true, showModal: false, nas_id: -1 };
       
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.fetchData();

        console.log('Component mounted');
    }

    private fetchData() {
        fetch('api/Naselje/Index')
            .then(response => response.json() as Promise<NaseljeData[]>)
            .then(data => {
                this.setState({ nasList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderNaseljeTable(this.state.nasList);
        return <div>
            <h1>Naselje Data</h1>
            <div>This component demonstrates fetching Naselje data from the server.</div>

            <h3>Naselje data count: {this.state.nasList.length}</h3>

            <div>
                <button type="button" onClick={this.showModal} className="btn">
                    Add New Naselje
                </button>
                <Modal
                    show={this.state.showModal}>
                    <AddNaselje history={this.props.history} parent={this} nas_id={this.state.nas_id} ref={(addNaselje) => { this.addNaseljeComponent = addNaselje; }}/>
                </Modal>
            </div>
            {contents}
        </div>;
    }

    showModal = () => {
        this.setState({
            ... this.state,
            showModal: !this.state.showModal,
            nas_id: -1
        });
    };

    // Handle Delete request for an naselje  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete naselje with Id: " + id))
            return;
        else {
            fetch('api/Naselje/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        nasList: this.state.nasList.filter((rec) => {
                            return (rec.idnaselje != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        // Show modal for edit:
        this.setState({
            ... this.state,
            nas_id: id,
            showModal: !this.state.showModal
        });

        if (this.addNaseljeComponent) {
            this.addNaseljeComponent.render();
        }
    }

    // Returns the HTML table to the render() method.  
    private renderNaseljeTable(naseljeList: NaseljeData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    {/*<th>ID Naselje</th>*/}
                    <th>Naziv</th>
                    <th>Postanski Broj</th>
                    <th>Drzava</th>
                </tr>
            </thead>
            <tbody>
                {naseljeList.map(nas =>
                    <tr key={nas.idnaselje}>
                        <td></td>
                        <td>{/*nas.idnaselje*/}</td>
                        <td>{nas.naziv}</td>
                        <td>{nas.postanskiBroj}</td>
                        <td>{nas.drzava && nas.drzava.naziv}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(nas.idnaselje)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(nas.idnaselje)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class NaseljeData {
    idnaselje: number = 0;
    naziv: string = "";
    postanskiBroj: string = "";
    drzava: DrzavaData = { iddrzava: 0, naziv: ""};
    drzavaid: number = 0;
}

export class DrzavaData {
    iddrzava: number = 0;
    naziv: string = "";
}