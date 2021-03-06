import React from 'react';
import {connect} from "react-redux";
import {getCollectionsList} from "../../redux/actions/collection";

import {
    TextContent,
    Text,
    TextVariants,
    PageSection,
    CardBody,
    CardTitle,
    EmptyStateIcon,
    EmptyState,
    Title,
    EmptyStateBody,
    Button, getUniqueId
} from '@patternfly/react-core';
import {Icon} from '@fluentui/react/lib/Icon';
import LoadingComponent from "../util/LoadingComponent";
import {withRouter} from "react-router-dom";
import CardComponent from "../util/CardComponent";
import CardLayout from "../util/CardLayout";
import {store} from "../../redux/store";
import {switchCollection} from "../../redux/slices/playerSlice";
import AlertComponent, {addAlert} from "../util/AlertComponent";

const mapStateToProps = state => ({
    collection: state.player.collection,
});

class CollectionSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            loading: true,
            alerts: [],
        }
    }

    componentDidMount() {
        this.mounted = true;

        // no selected collection
        store.dispatch(switchCollection(null));

        getCollectionsList().then(c => {
            if (this.mounted) {
                this.setState({
                    collections: c,
                    loading: false,
                });
            }
        }).catch(err => {
            this.setState({alerts: addAlert(this.state.alerts, 'Issue getting collections list.', 'danger', getUniqueId())});
            console.log('Error get collections list: ' + err);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.loading) {
            // still loading
            return <LoadingComponent/>
        } else if (this.state.collections.length === 0) {
            // no collection
            return (
                <EmptyState>
                    <AlertComponent obj={this}/>
                    <EmptyStateIcon icon={() => <Icon style={{fontSize: "4em"}} iconName="MusicInCollection"/>}/>
                    <Title headingLevel="h4" size="lg">No Music Collections</Title>
                    <EmptyStateBody>
                        Create a new music collection, or ask another user to be invited to view their music collections.
                    </EmptyStateBody>
                    <Button variant="primary" onClick={() => this.props.history.push('/new-collection')}>Create Collection</Button>
                </EmptyState>
            );
        } else {
            // collections
            return (
                <React.Fragment>
                    <AlertComponent obj={this}/>
                    <PageSection>
                        <TextContent>
                            <Text component={TextVariants.h1}>Music collections</Text>
                            <Text component="p">Select a music collection, or create a new one.</Text>
                        </TextContent>
                    </PageSection>
                    <PageSection>
                        <CardLayout>
                            {this.state.collections.map((col, key) => (
                                <CardComponent width="15em" url={'/collection/' + col.id} key={key}>
                                    <CardTitle>{col.name}</CardTitle>
                                    <CardBody>
                                        Owners: {col.owners.map(user => user.username)}
                                        <br/>
                                        Viewers: {col.viewers.map(user => user.username)}
                                    </CardBody>
                                </CardComponent>
                            ))}

                            <CardComponent width="15em" url={'/new-collection'} key="newCard">
                                <CardBody style={{textAlign: "center"}}>
                                    <Icon className="cardIcon" iconName="Add"/>
                                </CardBody>
                                <CardTitle style={{textAlign: "center"}}>New Collection</CardTitle>
                            </CardComponent>
                        </CardLayout>
                    </PageSection>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps)(CollectionSelect));
