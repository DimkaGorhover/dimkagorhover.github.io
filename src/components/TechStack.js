import React, {Component} from 'react';

class TechStack extends Component {

    render() {
        const {
            language,
            frameworks,
            prod_env,
            build_tool,
            ci_cd,
            storage,
            vcs,
            metrics
        } = this.props;

        return (
            <div>
                <h5>Stack of technologies:</h5>
                <ul>
                    <li>Language: Java {language}</li>
                    <li>Frameworks & Libs: {frameworks}</li>
                    <li>Production env: {prod_env}</li>
                    <li>Build Tool: {build_tool}</li>
                    <li>CI/CD: {ci_cd}</li>
                    <li>Storage: {storage}</li>
                    <li>VCS: {vcs}</li>
                    <li>Metrics System: {metrics}</li>
                </ul>
            </div>
        )
    }
}

export default TechStack