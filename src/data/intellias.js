export const exp = () => {
    
    return {
        id: "senior_java_developer_at_intellias",
        position: "Senior Java Developer",
        company: { name: "Intellias", link: "https://intellias.com" },
        city: "Lviv, Ukraine",
        dates: {
            start: new Date(2018, 11 - 1, 1),
            end: new Date(2019, 3 - 1, 15)
        },
        description: [
            `I'd been working on implementing new algorithms 
            for map matching, providing a comprehensive analysis 
            of different algorithms comparison, developing and extend 
            map matching pipelines with multi-algorithms support`
        ],
        responsibility: [
            `Implementing new Map Matcher algorithm based 
            on Hidden Markov Model + Algorithm Viterbi`
        ],
        techStack: {
            language: ["Java 8"],
            frameworks: [],
            prod_env: [],
            build_tool: ["Apache Maven"],
            ci_cd: ["Jenkins"],
            storage: [],
            metrics: [],
            vcs: ["Git (Gerrit)"]
        }
    }
}
