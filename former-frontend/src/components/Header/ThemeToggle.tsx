import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeToggle = () => (
    <div>
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                data-toggle-theme="light,dark"
                data-act-class="swap-active"
            />

            <BsSun className="swap-off" />
            <BsMoon className="swap-on" />
        </label>
    </div>
);

export default ThemeToggle;
