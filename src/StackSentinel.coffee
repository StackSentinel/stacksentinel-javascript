class @StackSentinelClient
    constructor: (@accountToken, @projectToken, @environment, @tags=null, @endPoint=null) ->
        if !@endPoint
            @endPoint = "https://api.stacksentinel.com/api/v1/insert"

    handleException: (error, state=null, returnFeedbackUrls=false) =>
        if (error instanceof EvalError)
            errorType = 'EvalError'
        else if (error instanceof RangeError)
            errorType = 'RangeError'
        else if (error instanceof ReferenceError)
            errorType = 'ReferenceError'
        else if (error instanceof SyntaxError)
            errorType = 'SyntaxError'
        else if (error instanceof TypeError)
            errorType = 'TypeError'
        else if (error instanceof URIError)
            errorType = 'URIError'

        if state is null
            state = {}

        #state['window'] = window
        state['window'] = {}
        state['document'] = {}
        state['navigator'] = {}
        windowElements = ['history', 'scrollX', 'scrollY', 'location']
        for i in windowElements
            try
                # Make sure it can serialize
                state['window'][i] = JSON.parse(JSON.stringify(window[i]))
            catch e
                state['window'][i] = '<Unavailable>'
        documentElements = ['activeElement', 'documentURI', 'domain', 'title', 'URL', 'cookie']
        for i in documentElements
            try
                # Make sure it can serialize
                state['document'][i] = JSON.parse(JSON.stringify(document[i]))
            catch e
                state['document'][i] = '<Unavailable>'
        navigatorElements = ['userAgent', 'product', 'platform', 'language', 'cookieEnabled', 'appCodeName', 'appName', 'appVersion']
        for i in navigatorElements
            try
                state['navigator'][i] = JSON.parse(JSON.stringify(navigator[i]))
            catch e
                state['navigator'][i] '<Unavailable>'


        try
            fileName = error.fileName
        catch e
            fileName = "unknown"

        try
            lineNumber = error.lineNumber
        catch e
            lineNumber = 0


        payload = {
            project_token: @projectToken
            account_token: @accountToken
            return_feedback_urls: returnFeedbackUrls
            errors: [{
                error_type: errorType
                error_message: error.message
                environment: @environment
                state: state
                traceback: [{
                    method: 'unknown'
                    module: fileName,
                    line: lineNumber
                }]
            }]
        }
        @_send(payload)

    _send: (payload) =>
        $.ajax
            url: @endPoint
            method: "POST"
            dataType: "json"
            contentType: "application/json; charset=utf-8"
            crossDomain: true
            data: JSON.stringify(payload)
            error: (jqXHR, textStatus, errorThrown) ->
                console.log("Error calling Stack Sentinel", jqXHR, textStatus, errorThrown)
            success: (data, textStatus, jqXHR) ->
                console.log("Exception sent to Stack Sentinel", data, textStatus, jqXHR)
