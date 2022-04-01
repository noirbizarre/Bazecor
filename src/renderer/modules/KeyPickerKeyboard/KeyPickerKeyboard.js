import React, { Component, Fragment } from "react";
import Styled from "styled-components";

// Internal components
import Keymap, { KeymapDB } from "../../../api/keymap";
import { Picker } from "./../KeyPickerKeyboard";
import Keys from "../../components/KeyManager/Keys";
import Selector from "../../components/KeyManager/Selector";

// React Components
import Container from "react-bootstrap/Container";

const Style = Styled.div`

.type-card {
    min-height: 100%;
}
.select-card {
    min-height: 100%;
    padding: 0;
}
.nospacing{
    padding: 0;
    margin: 0;
}
.dropdown-menu.show {
  display: block;
  overflow-y: auto;
  height: 230px;
}
.dropdown-menu.show::-webkit-scrollbar {
  display: none;
}
.selectButton{
  .dropdown-toggle{
    text-align: left;
    margin-top: 0.375rem;
  }
}
.dropup .dropdown-toggle::after {
  border-bottom: 0;
  border-top: .3em solid;
  border-right: .3em solid transparent;
  float: right;
  border-left: .3em solid transparent;
  margin-top: 10px;
}
.rowsection {
  margin: 0;
  flex-wrap: nowrap;
}
.section {
  min-height: 100%;
  padding: 0;
}
.pickersection {
  min-height: 100%;
  padding: 0;
}
.hidden {
  visibility: hidden;
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
.overflow {
  overflow: visible;
}
.overflow::-webkit-scrollbar {
  display: none;
}
.card-title {
  margin-bottom: .3rem;
}
.card-header-tabs {
  margin: 0;
  border: 0;
}
.nav-tabs .nav-link {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.colors.button.background};
  padding: .2rem 1rem;
}
.nav-tabs .nav-link.active {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.card.background};
}

.Tabstyle {
  margin-left: 322px;
  margin-top: -31px;
  width: 280px;
  position: absolute;
  .tab-content {
    margin-top: 31px;
  }
}
`;

class KeyPickerKeyboard extends Component {
  constructor(props) {
    super(props);

    this.keymapDB = new KeymapDB();

    let tempModifs = Array(5);
    let tempActions = props.actions;
    if (props.actions === undefined) {
      tempActions = [[0], [0], [0], [0], [0]];
    } else {
      tempActions = props.actions;
    }
    tempActions.forEach((element, i) => {
      if (element > 255 && element < 8192) {
        tempModifs[i] = 0;
      } else {
        tempModifs[i] = [];
      }
    });

    this.state = {
      action: Number.isInteger(props.action) ? props.action : 0,
      actions: tempActions,
      modifs: tempModifs,
      disable: false,
      selectdual: 0,
      selectlayer: 0,
      activeTab: "editor",
      layerData: 0,
      showKB: false,
      pastkeyindex: props.keyIndex,
      superName: props.superName
    };

    this.parseAction = this.parseAction.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  componentDidUpdate() {
    let selectdual = 0;
    const disable = this.props.code === 0;
    const keynum = this.props.code != null ? this.props.code.modified + this.props.code.base : 0;
    if (keynum >= 51218 && keynum <= 53266) {
      selectdual = (this.props.code.modified >>> 8) << 8;
      if (selectdual >= 51218 - 18) {
        selectdual += 18;
      } else {
        selectdual += 17;
      }
    } else {
      selectdual = 0;
    }
    let layerData = 0;
    if ((keynum >= 17450 && keynum <= 17501) || (keynum >= 49161 && keynum <= 49168)) {
      layerData = keynum;
    } else {
      layerData = 0;
    }

    let tempModifs = Array(5);
    let tempActions;
    if (this.props.actions === undefined) {
      tempActions = [0, 0, 0, 0, 0];
    } else {
      tempActions = this.props.actions;
    }
    tempActions.forEach((element, i) => {
      if (element > 255 && element < 8448) {
        tempModifs[i] = 0;
      } else {
        tempModifs[i] = [];
      }
    });
    let activeTab = "editor";
    if (
      keynum < 256 ||
      (keynum > 53851 && keynum < 53852 + 64) ||
      (keynum > 49152 && keynum < 49161) ||
      keynum == 65535 ||
      disable
    ) {
      activeTab = "editor";
    } else if (layerData > 0 || selectdual > 0) {
      activeTab = "layer";
    } else {
      activeTab = "super";
    }
    if (JSON.stringify(this.state.actions) !== JSON.stringify(tempActions)) {
      this.setState({
        action: this.props.keyIndex !== this.state.pastkeyindex ? 0 : this.state.action,
        actions: tempActions,
        selectdual,
        layerData,
        disable,
        modifs: tempModifs,
        pastkeyindex: this.props.keyIndex,
        activeTab,
        superName: this.props.superName
      });
    }
  }

  parseKey(keycode) {
    const macro = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)];
    let macroName;
    try {
      macroName = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)].name.substr(0, 5);
    } catch (error) {
      macroName = "*NotFound*";
    }
    if (keycode >= 53852 && keycode <= 53852 + 64) {
      if (this.props.code !== null) return this.keymapDB.parse(keycode).extraLabel + "." + macroName;
    }
    return this.props.code !== null
      ? this.keymapDB.parse(keycode).extraLabel != undefined
        ? this.keymapDB.parse(keycode).extraLabel + "." + this.keymapDB.parse(keycode).label
        : this.keymapDB.parse(keycode).label
      : "";
  }

  parseAction(action) {
    let aux;
    try {
      aux = this.parseKey(this.state.actions[action]);
    } catch (error) {
      aux = 0;
    }
    return aux;
  }

  changeTab(tab) {
    this.setState({ activeTab: tab, action: 0 });
  }

  render() {
    const { action, actions, showKB, modifs, superName, disable, Keymap } = this.state;
    const { selectedlanguage, kbtype, macros, actTab, superkeys, code, onKeySelect } = this.props;
    const activeTab = actTab != undefined ? actTab : this.state.activeTab;
    const selKey = this.parseKey(code.base + code.modified);
    const selKeys = actions.map((a, i) => this.parseAction(i));
    // console.log(code);

    return (
      <Style>
        <div className="singleViewWrapper">
          <div className="keyEnhance">keyEnhance</div>
          <div className="keyBoard">
            <Picker
              actions={actions}
              action={action}
              disable={disable}
              baseCode={code.base}
              modCode={code.modified}
              onKeySelect={onKeySelect}
              activeTab={activeTab}
              selectedlanguage={selectedlanguage}
              kbtype={kbtype}
            />
          </div>
        </div>

        <Container fluid>
          {code.base + code.modified >= 53916 && code.base + code.modified <= 53916 + 64 ? (
            <Selector
              action={action}
              actions={actions}
              selKeys={selKeys}
              onKeySelect={onKeySelect}
              superkeys={superkeys}
              keyCode={code}
            />
          ) : (
            <Keys
              selKey={selKey}
              activeKB={showKB}
              keyCode={code}
              macros={macros}
              onKeySelect={onKeySelect}
              activeTab={activeTab}
            />
          )}
        </Container>
      </Style>
    );
  }
}

export default KeyPickerKeyboard;
