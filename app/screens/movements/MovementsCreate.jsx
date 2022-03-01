import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createMovement, getBalance, getMovements } from '../../redux/slices/movementsSlice';

const MovementsCreate = ({ navigation }) => {
  const dispatch = useDispatch();

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      category_id: 5,
      type: 'ENTRY',
      description: '',
    },
    mode: 'onChange',
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {/* <Text style={styles.headingStyle}>Form Builder Basic Demo</Text> */}
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              name: 'category_id',
              type: 'select',
              textInputProps: {
                label: 'Categoria',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Categoria es requerida',
                },
              },
              options: [
                {
                  value: 1,
                  label: 'Impuesto',
                },
                {
                  value: 2,
                  label: 'Alquiler',
                },
                {
                  value: 3,
                  label: 'Comida',
                },
                {
                  value: 4,
                  label: 'Ocio',
                },
                {
                  value: 5,
                  label: 'Varios',
                },
              ],
            },
            {
              name: 'type',
              type: 'select',
              textInputProps: {
                label: 'Tipo',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Tipo es requerido',
                },
              },
              options: [
                {
                  value: 'ENTRY',
                  label: 'Ingreso',
                },
                {
                  value: 'EGRESS',
                  label: 'Egreso',
                },
              ],
            },
            {
              type: 'text',
              name: 'amount',
              rules:
              {
                required: {
                  value: true,
                  message: 'Monto es requerido',
                },
                pattern: {
                  value: /^\d+(\.\d{0,2})?$/,
                  message: 'Monto es invalido',
                },
                min: {
                  value: 0.01,
                  message: 'Monto es invalido',
                },
                max: {
                  value: 999999.99,
                  message: 'Monto es invalido',
                },
              }
              ,
              textInputProps: {
                label: 'Monto',
              },
            },
            {
              type: 'text',
              name: 'description',
              textInputProps: {
                label: 'Descripcion',
              },
            },
          ]}
        />
        <Button
          mode={'contained'}
          onPress={handleSubmit((data) => {
            dispatch(createMovement(data));
            dispatch(getMovements());
            dispatch(getBalance());
            navigation.navigate('movements');
          })}>
          Submit
        </Button>
      </ScrollView>
    </View>
  )
}

export default MovementsCreate

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
})