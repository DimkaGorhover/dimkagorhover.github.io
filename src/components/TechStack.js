import React, {Component} from 'react';

export default class TechStack extends Component {

    render() {

        let {
            language, frameworks, prod_env, build_tool, ci_cd, storage, vcs, metrics
        } = this.props.tech_stack;

        language = language && (<li><b>Language</b>: {language}</li>);
        frameworks = frameworks && (<li><b>Frameworks & Libs</b>: {frameworks}</li>);
        prod_env = prod_env && (<li><b>Production env</b>: {prod_env}</li>);
        build_tool = build_tool && (<li><b>Build Tool</b>: {build_tool}</li>);
        ci_cd = ci_cd && (<li><b>CI/CD</b>: {ci_cd}</li>);
        storage = storage && (<li><b>Storage</b>: {storage}</li>);
        vcs = vcs && (<li><b>VCS</b>: {vcs}</li>);
        metrics = metrics && (<li><b>Metrics System</b>: {metrics}</li>);

        return (
            <div>
                <h5>Stack of technologies:</h5>
                <ul>
                    {language}
                    {frameworks}
                    {prod_env}
                    {build_tool}
                    {ci_cd}
                    {storage}
                    {vcs}
                    {metrics}
                </ul>
            </div>
        )
    }
}
