import React from 'react';
import {
    TextContent,
    Text,
    TextVariants, PageSection, PageSectionVariants
} from '@patternfly/react-core';

export default class LandingPage extends React.Component {

    render() {
        return (
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text component={TextVariants.h1}>Acris</Text>
                </TextContent>
            </PageSection>
        )
    }
}

