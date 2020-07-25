import React from "react";
import {Breadcrumb, BreadcrumbItem} from "@patternfly/react-core";
import {withRouter} from "react-router-dom";
import './BreadcrumbComponent.css'

// Quick utility to render breadcrumbs
// Input: Array of elements (as prop element)
// Each element: {link, display, isActive}

class BreadcrumbComponent extends React.Component {

    render() {
        return (
            <Breadcrumb>
                {this.props.elements.map((element, index) => {
                    if (element.isActive) {
                        return <BreadcrumbItem key={index} isActive>{element.display}</BreadcrumbItem>;
                    } else {
                        return <BreadcrumbItem key={index} onClick={() => this.props.history.push(element.link)}><span className='breadcrumbItem'>{element.display}</span></BreadcrumbItem>;
                    }
                })}
            </Breadcrumb>
        )
    }
}

export default withRouter(BreadcrumbComponent);

