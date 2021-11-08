const smartgrid = require('smart-grid');

const settings = {
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1920px',
        fields: '140px'
    },
    breakPoints: {
        md: {
            width: "1024px",
            fields: "15px"
        },
        sm: {
            width: "760px",
            fields: "10px"
        },
        xs: {
            width: "480px",
            fields: "5px"
        }
    },
    oldSizeStyle: false,
    mobileFirst: false
};

smartgrid('./src/less', settings);