const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            url_db: 'mongodb+srv://user_admin:admin1234@clusterapi-p7shf.mongodb.net/test?retryWrites=true',
            secret_key: 'superSecreto',
            token_time: '7d'
        }
    }
}

console.log(`Inciando aplicação no ambiente ${env.toLocaleUpperCase()}`);

module.exports = config();