import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { NaseljeData } from './FetchNaselje';
import { DrzavaData } from './FetchNaselje';
import { Redirect } from 'react-router-dom';

interface AddNaseljeDataState {
    title: string;
    loading: boolean;
    drzavaList: Array<any>;
    nasData: NaseljeData;
    drzavaId: number;
}

export class AddNaselje extends React.Component<any, AddNaseljeDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, drzavaList: [], nasData: new NaseljeData, drzavaId: -1};
        fetch('api/Naselje/GetDrzavaList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ drzavaList: data });
            });

        var nasid = -1;
        if (this.props.nas_id > 0) {
            nasid = this.props.nas_id;
        }

        // This will set state for Edit naselje  
        if (nasid > 0) {
            fetch('api/Naselje/Details/' + nasid)
                .then(response => response.json() as Promise<NaseljeData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, nasData: data });
                });
        }
        // This will set state for Add naselje  
        else {
            this.state = { title: "Create", loading: false, drzavaList: [], nasData: new NaseljeData, drzavaId: -1 };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.drzavaList);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Naselje</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {

        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit naselje.  
        if (this.state.nasData.idnaselje) {
            fetch('api/Naselje/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.parent.fetchData();
                    this.props.parent.showModal();
                })
        }
        // POST request for Add naselje.  
        else {
            fetch('api/Naselje/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson == -1) {
                        alert("Record already exists!");
                    }
                    else {
                        this.props.parent.fetchData();
                        this.props.parent.showModal();
                    }
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.parent.showModal();
    }

    private handleChange(e){
        this.setState({ drzavaId: e.target.value });
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(drzavaList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="idnaselje" value={this.state.nasData.idnaselje} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Naziv">Naziv</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="naziv" defaultValue={this.state.nasData.naziv} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="PostanskiBroj" >Postanski broj</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" name="PostanskiBroj" defaultValue={this.state.nasData.postanskiBroj} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Drzava">Država</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="drzavaid" value={this.state.nasData.drzava.iddrzava} onChange={this.handleChange} required>
                            <option value="">-- Odaberite Državu --</option>
                            {drzavaList.map(drzava =>
                                <option key={drzava.iddrzava} value={drzava.iddrzava}>{drzava.naziv}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>&nbsp;
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}

