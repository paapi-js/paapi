import 'virtual:windi.css'
import './style.css'

import {Application} from '@hotwired/stimulus';
import DemoController from './DemoController';

const Stimulus = Application.start()
Stimulus.register("demo", DemoController)

