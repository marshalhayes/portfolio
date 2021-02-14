import React from 'react';
import BaseLayout from './layouts/Base';

export default function NotFound(props) {
  return (
    <BaseLayout {...props}>
      <div className="container mx-auto px-3">
        <a href="/" className="text-sizzling-red no-underline">
          &lt; Go back
        </a>

        <h1>Error 404: Page not found</h1>

        <div className="flex flex-col lg:flex-row-reverse my-3">
          <img
            src="/public/images/bunny-falling-asleep.gif"
            className="block mx-auto mb-3"
            alt=""
          />

          <div className="lg:mr-3">
            <p>
              Our server bunnies weren't able to find a page at this address -
              probably because they fell asleep on the job.
            </p>

            <p>
              We'll gently poke them to remind them they're supposed to be
              working. After all, we give them way too many 🥕 for this to
              happen.
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
