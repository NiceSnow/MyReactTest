import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Modal,
  Platform,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image
} from 'react-native';
import colors from './colors';
import GQUtils from "../../../utils/GQUtils";
import GQCustomText from '../../customText/GQCustomText'
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();

const { height } = Dimensions.get('window');

// TODO: Don't rely on Dimensions for the actions footer layout
// TODO: Support custom actions
// TODO: Stacked full-width buttons

const ActionButton = ({ testID, onPress, colorAccent, label }) => (
  <TouchableWithoutFeedback
    testID={testID}
    style={styles.actionContainer}
   // underlayColor={colors.androidPressedUnderlay}
    onPress={onPress}
  >
    <Image source={{ uri: 'tanceng_guanbi' }} style={{ width: 76 * iPhone6sScale, height: 76 * iPhone6sScale }}></Image>

  </TouchableWithoutFeedback>
);

const MaterialDialog = ({
  visible,
  scrolled,
  title,
  titleColor,
  colorAccent,
  backgroundColor,
  addPadding,
  onOk,
  onCancel,
  okLabel,
  cancelLabel,
  children,
}) => (
  <Modal
    animationType={'fade'}
    transparent
    hardwareAccelerated
    visible={visible}
    onRequestClose={onCancel}
    supportedOrientations={['portrait', 'landscape']}
  >
   
      <View style={styles.backgroundOverlay}>
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View
            style={[
              styles.modalContainer,
              (title != null || (addPadding && title == null)) && styles.modalContainerPadding,
            
            ]}
          >
           
              <View>
                {title != null ? (
                  <View style={scrolled ? styles.titleContainerScrolled : styles.titleContainer}>
                  <GQCustomText>{title}</GQCustomText>
                  </View>
                ) : null}
                <View
                  style={
                    scrolled
                      ? [
                        styles.contentContainerScrolled,
                        addPadding && styles.contentContainerScrolledPadding,
                      ]
                      : [styles.contentContainer, addPadding && styles.contentContainerPadding]
                  }
                >
                  {children}
                </View>
                { !!onCancel ? (
                  <View
                    style={scrolled ? styles.actionsContainerScrolled : styles.actionsContainer}
                  >
                    <ActionButton
                      testID="dialog-cancel-button"
                      colorAccent={colorAccent}
                      onPress={onCancel}
                      label={cancelLabel}
                    />
                  </View>
                ) : null}
              </View>
          
          </View>
        </KeyboardAvoidingView>
      </View>
  
  </Modal>
);

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    marginHorizontal: 0,
    marginVertical: 106*iPhone6sScale,
    minWidth: 280*iPhone6sScale,
    borderRadius: 2,
    elevation: 24,
    overflow: 'hidden',
    backgroundColor:'rgba(0, 0, 0, 0)',
  },
  modalContainerPadding: {
    paddingTop: 0,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  contentContainer: {
    flex: -1,
  },
  contentContainerPadding: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  contentContainerScrolled: {
    flex: -1,
    maxHeight: height - 256, // (106px vertical margin * 2) + 52px
  },
  contentContainerScrolledPadding: {
    paddingHorizontal: 0,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  colorAccent: PropTypes.string,
  scrolled: PropTypes.bool,
  addPadding: PropTypes.bool,
};

MaterialDialog.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'CANCEL',
  title: undefined,
  titleColor: colors.androidPrimaryTextColor,
  backgroundColor: colors.background,
  colorAccent: colors.androidColorAccent,
  scrolled: false,
  addPadding: true,
  onOk: undefined,
  onCancel: undefined,
};

ActionButton.propTypes = {
  testID: PropTypes.string.isRequired,
  colorAccent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MaterialDialog;
