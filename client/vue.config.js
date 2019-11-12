module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/scss/imports.scss";
                `
            }
        }
    }
};