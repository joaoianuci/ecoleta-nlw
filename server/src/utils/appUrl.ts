import ip from 'ip';

const myIp = ip.address();

const appAddress = {
    url_app: `http://${myIp}:${process.env.PORT}`,
    port_app : process.env.PORT,
    ip_app: myIp
}

export default appAddress;