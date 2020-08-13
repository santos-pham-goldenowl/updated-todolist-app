import React from "react";
import * as Sentry from "@sentry/react";

import TodoContainer from "./Container Component/TodoContainer";

Sentry.init({ dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" });
function FallbackComponent() {
  return <div>An error has occurred</div>;
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
          <TodoContainer />
        </Sentry.ErrorBoundary>
      </div>
    );
  }
}

export default App;
