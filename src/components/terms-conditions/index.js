import React from 'react';
import {
  TextInput,
  ScrollView,
  Image,
  Modal,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import styles from './styles';

const TermsConditions = ({isOpen, closeModal}) => (
  <Modal animationType="fade" transparent={true} visible={isOpen}>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Terms and Conditions</Text>
            <TouchableOpacity onPress={() => closeModal()}>
              <Image
                source={require('../../images/close-button.png')}
                style={styles.btnClose}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <Text style={{marginHorizontal: 20, marginBottom: 20}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras
            semper auctor neque vitae tempus quam. Aliquam eleifend mi in nulla
            posuere sollicitudin aliquam ultrices sagittis. Commodo ullamcorper
            a lacus vestibulum sed arcu non. Ut ornare lectus sit amet est
            placerat in egestas. Donec enim diam vulputate ut. Et netus et
            malesuada fames ac turpis. Non tellus orci ac auctor. Dictum sit
            amet justo donec enim diam. Dolor purus non enim praesent elementum
            facilisis leo vel. Nec ullamcorper sit amet risus nullam eget. Nibh
            nisl condimentum id venenatis. Dolor magna eget est lorem ipsum.
            Lectus quam id leo in. Sodales ut etiam sit amet nisl purus in.
            Viverra orci sagittis eu volutpat odio facilisis. Quis eleifend quam
            adipiscing vitae. Magnis dis parturient montes nascetur. Enim nunc
            faucibus a pellentesque sit amet. Volutpat lacus laoreet non
            curabitur gravida arcu ac. Aliquet nibh praesent tristique magna sit
            amet purus. Neque aliquam vestibulum morbi blandit. Elit sed
            vulputate mi sit amet mauris commodo quis. Vehicula ipsum a arcu
            cursus vitae congue. Vitae congue eu consequat ac. Rhoncus est
            pellentesque elit ullamcorper dignissim cras tincidunt lobortis
            feugiat. Arcu risus quis varius quam quisque id diam vel quam. Dolor
            sit amet consectetur adipiscing elit duis tristique. Id leo in vitae
            turpis massa sed elementum tempus. Cursus vitae congue mauris
            rhoncus. Quis vel eros donec ac odio tempor orci dapibus ultrices.
            Mauris pellentesque pulvinar pellentesque habitant morbi tristique
            senectus et. Eu nisl nunc mi ipsum faucibus. Neque egestas congue
            quisque egestas diam in arcu cursus euismod. Tellus id interdum
            velit laoreet id donec ultrices. Sed egestas egestas fringilla
            phasellus. Nisl nisi scelerisque eu ultrices vitae auctor eu augue.
            Dignissim cras tincidunt lobortis feugiat vivamus at. Urna id
            volutpat lacus laoreet. Pellentesque eu tincidunt tortor aliquam
            nulla facilisi cras fermentum. Lacinia quis vel eros donec. Ultrices
            dui sapien eget mi. Tellus rutrum tellus pellentesque eu tincidunt.
            At augue eget arcu dictum varius duis at consectetur lorem. Vitae
            turpis massa sed elementum tempus egestas sed. Velit scelerisque in
            dictum non. Vitae semper quis lectus nulla at. Vitae et leo duis ut
            diam quam nulla porttitor massa. Tempus urna et pharetra pharetra
            massa massa. Molestie nunc non blandit massa enim. Integer enim
            neque volutpat ac tincidunt vitae semper quis. Risus nec feugiat in
            fermentum posuere urna nec tincidunt. Sit amet venenatis urna cursus
            eget nunc scelerisque viverra. Duis at consectetur lorem donec massa
            sapien. Semper quis lectus nulla at. Sodales ut etiam sit amet nisl
            purus in mollis nunc. Dignissim diam quis enim lobortis scelerisque
            fermentum dui faucibus in. Leo a diam sollicitudin tempor id eu nisl
            nunc mi. Massa massa ultricies mi quis hendrerit dolor magna eget
            est. Donec ac odio tempor orci dapibus ultrices in iaculis. Amet
            luctus venenatis lectus magna fringilla urna porttitor. Nulla
            aliquet enim tortor at auctor urna nunc id cursus. Condimentum vitae
            sapien pellentesque habitant morbi tristique senectus et netus. Eget
            est lorem ipsum dolor sit amet consectetur. Eget nunc scelerisque
            viverra mauris in aliquam sem fringilla. Velit euismod in
            pellentesque massa placerat duis ultricies. Cras tincidunt lobortis
            feugiat vivamus at augue eget arcu dictum. Cras ornare arcu dui
            vivamus arcu. Turpis egestas sed tempus urna et. Et netus et
            malesuada fames ac turpis egestas sed tempus. Nec sagittis aliquam
            malesuada bibendum arcu vitae elementum. Sapien et ligula
            ullamcorper malesuada proin. Cras semper auctor neque vitae tempus
            quam. Eu tincidunt tortor aliquam nulla facilisi cras. Etiam non
            quam lacus suspendisse faucibus interdum posuere. Sed cras ornare
            arcu dui. Eu scelerisque felis imperdiet proin fermentum. Maecenas
            sed enim ut sem viverra aliquet eget sit. Suspendisse sed nisi lacus
            sed. A diam sollicitudin tempor id eu.
          </Text>

          <TouchableOpacity onPress={closeModal} style={styles.btnChange}>
            <Text style={styles.btnChangeText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </Modal>
);

export default TermsConditions;
