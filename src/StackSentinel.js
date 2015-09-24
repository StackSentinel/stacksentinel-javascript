// Generated by CoffeeScript 1.9.3
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.StackSentinelClient = (function() {
    function StackSentinelClient(accountToken, projectToken, environment, tags, endPoint) {
      this.accountToken = accountToken;
      this.projectToken = projectToken;
      this.environment = environment;
      this.tags = tags != null ? tags : null;
      this.endPoint = endPoint != null ? endPoint : null;
      this._send = bind(this._send, this);
      this.handleException = bind(this.handleException, this);
      if (!this.endPoint) {
        this.endPoint = "https://api.stacksentinel.com/api/v1/insert";
      }
    }

    StackSentinelClient.prototype.handleException = function(error, state, returnFeedbackUrls) {
      var documentElements, e, errorType, fileName, i, j, k, l, len, len1, len2, lineNumber, navigatorElements, payload, windowElements;
      if (state == null) {
        state = null;
      }
      if (returnFeedbackUrls == null) {
        returnFeedbackUrls = false;
      }
      if (error instanceof EvalError) {
        errorType = 'EvalError';
      } else if (error instanceof RangeError) {
        errorType = 'RangeError';
      } else if (error instanceof ReferenceError) {
        errorType = 'ReferenceError';
      } else if (error instanceof SyntaxError) {
        errorType = 'SyntaxError';
      } else if (error instanceof TypeError) {
        errorType = 'TypeError';
      } else if (error instanceof URIError) {
        errorType = 'URIError';
      }
      if (state === null) {
        state = {};
      }
      state['window'] = {};
      state['document'] = {};
      state['navigator'] = {};
      windowElements = ['history', 'scrollX', 'scrollY', 'location'];
      for (j = 0, len = windowElements.length; j < len; j++) {
        i = windowElements[j];
        try {
          state['window'][i] = JSON.parse(JSON.stringify(window[i]));
        } catch (_error) {
          e = _error;
          state['window'][i] = '<Unavailable>';
        }
      }
      documentElements = ['activeElement', 'documentURI', 'domain', 'title', 'URL', 'cookie'];
      for (k = 0, len1 = documentElements.length; k < len1; k++) {
        i = documentElements[k];
        try {
          state['document'][i] = JSON.parse(JSON.stringify(document[i]));
        } catch (_error) {
          e = _error;
          state['document'][i] = '<Unavailable>';
        }
      }
      navigatorElements = ['userAgent', 'product', 'platform', 'language', 'cookieEnabled', 'appCodeName', 'appName', 'appVersion'];
      for (l = 0, len2 = navigatorElements.length; l < len2; l++) {
        i = navigatorElements[l];
        try {
          state['navigator'][i] = JSON.parse(JSON.stringify(navigator[i]));
        } catch (_error) {
          e = _error;
          state['navigator'][i]('<Unavailable>');
        }
      }
      try {
        fileName = error.fileName;
      } catch (_error) {
        e = _error;
        fileName = "unknown";
      }
      try {
        lineNumber = error.lineNumber;
      } catch (_error) {
        e = _error;
        lineNumber = 0;
      }
      payload = {
        project_token: this.projectToken,
        account_token: this.accountToken,
        return_feedback_urls: returnFeedbackUrls,
        errors: [
          {
            error_type: errorType,
            error_message: error.message,
            environment: this.environment,
            state: state,
            traceback: [
              {
                method: 'unknown',
                module: fileName,
                line: lineNumber
              }
            ]
          }
        ]
      };
      return this._send(payload);
    };

    StackSentinelClient.prototype._send = function(payload) {
      return $.ajax({
        url: this.endPoint,
        method: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        data: JSON.stringify(payload),
        error: function(jqXHR, textStatus, errorThrown) {
          return console.log("Error calling Stack Sentinel", jqXHR, textStatus, errorThrown);
        },
        success: function(data, textStatus, jqXHR) {
          return console.log("Exception sent to Stack Sentinel", data, textStatus, jqXHR);
        }
      });
    };

    return StackSentinelClient;

  })();

}).call(this);

//# sourceMappingURL=StackSentinel.js.map
