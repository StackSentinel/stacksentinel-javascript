# JavaScript integration with Stack Sentinel

To get started with StackSentinel and JavaScript, simply import our library from our servers and include your
app's code in a try/catch blog. It's easy:
    
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script src="https://distrib.stacksentinel.com/distrib/StackSentinel.js"></script>
      <script>
          var tags = [];
          var client = new StackSentinelClient(
                  "YOUR PROJECT TOKEN",
                  "YOUR ACCOUNT TOKEN",
                  "development",
                  tags
          );
      
          try {
              alert(foo.bar);
          } catch(e) {
               client.handleException(e);
          }
      </script>
