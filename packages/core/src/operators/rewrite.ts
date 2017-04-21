/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import {
  MotionObservable,
} from '../observables/MotionObservable';

import {
  Constructor,
  Dict,
  MotionMappable,
} from '../types';

export interface MotionRewritable<T> {
  rewrite<U>(dict: Dict<U>): MotionObservable<U>;
  rewrite<U>(dict: Map<T, U>): MotionObservable<U>;
}

export function withRewrite<T, S extends Constructor<MotionMappable<T>>>(superclass: S): S & Constructor<MotionRewritable<T>> {
  return class extends superclass implements MotionRewritable<T> {
    rewrite<U>(dict: Dict<U>): MotionObservable<U>;
    rewrite<U>(dict: Map<T, U>): MotionObservable<U> {
      return this._map(
        (key: T) => typeof dict.get === 'function'
          ? dict.get(key)
          : dict[key]
      );
    }
  };
}