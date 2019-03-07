const se_scraper = require('./index.js');

let config = {
    // the user agent to scrape with
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    // if random_user_agent is set to True, a random user agent is chosen
    random_user_agent: true,
    // how long to sleep between requests. a random sleep interval within the range [a,b]
    // is drawn before every request. empty string for no sleeping.
    sleep_range: '[1,2]',
    // which search engine to scrape
    search_engine: 'google',

    // use specific search engine parameters for various search engines
    // google_settings: {
    //     google_domain: 'google.com',
    //     gl: 'us', // The gl parameter determines the Google country to use for the query.
    //     hl: 'us', // The hl parameter determines the Google UI language to return results.
    //     start: 0, // Determines the results offset to use, defaults to 0.
    //     num: 100, // Determines the number of results to show, defaults to 10. Maximum is 100.
    // },

    google_settings: '{"gl": "tr", "hl": "tr", "num": "50", "start": "0"}',

    // https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-web-api-v5-reference#query-parameters
    bing_settings: {
        count: 50,      // how many results per page
        safeSearch: 'Off',      // safe search (strict, moderate, off)
        cc: 'us',        // ISO 3166 country code
        offset: 0, // The zero-based offset that indicates the number of search results to skip before returning results
    },

    // whether debug information should be printed
    // debug info is useful for developers when debugging
    debug: false,
    // whether verbose program output should be printed
    // this output is informational
    verbose: true,
    // an array of keywords to scrape
    keywords: ['good news'],
    // alternatively you can specify a keyword_file. this overwrites the keywords array
    keyword_file: '',
    // the number of pages to scrape for each keyword
    num_pages: 2,
    // whether to start the browser in headless mode
    headless: true,
    // path to output file, data will be stored in JSON
    output_file: 'examples/results/advanced.json',
    // whether to prevent images, css, fonts from being loaded
    // will speed up scraping a great deal
    block_assets: true,
    // path to js module that extends functionality
    // this module should export the functions:
    // get_browser, handle_metadata, close_browser
    // must be an absolute path to the module
    //custom_func: resolve('examples/pluggable.js'),
    custom_func: '',
    // use a proxy for all connections
    // example: 'socks5://78.94.172.42:1080'
    // example: 'http://118.174.233.10:48400'
    proxy: '',
    // a file with one proxy per line. Example:
    // socks5://78.94.172.42:1080
    // http://118.174.233.10:48400
    proxy_file: '',
    // check if headless chrome escapes common detection techniques
    // this is a quick test and should be used for debugging
    test_evasion: false,
    apply_evasion_techniques: false,
    // log ip address data
    log_ip_address: false,
    // log http headers
    log_http_headers: false,
    puppeteer_cluster_config: {
        timeout: 10 * 60 * 1000, // max timeout set to 10 minutes
        monitor: false,
        concurrency: 1, // one scraper per tab
        maxConcurrency: 1, // scrape with 2 tabs
    }
};

function callback(err, response) {
    if (err) { console.error(err) }

    /* response object has the following properties:

        response.results - json object with the scraping results
        response.metadata - json object with metadata information
        response.statusCode - status code of the scraping process
     */

    console.dir(response.results, {depth: null, colors: true});
}

se_scraper.scrape(config, callback);
