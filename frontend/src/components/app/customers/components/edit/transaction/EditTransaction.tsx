import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Transaction, TransactionFormValues } from "@/types/Transaction";
import FormActions from "@/components/common/form/FormAction.tsx";
import { TransactionSchema } from "@/components/app/validationSchemas";
import useGetCustomers from "../../../hooks/customer/useGetCustomers";
import useCreateTransaction from "../../../hooks/transaction/useCreateTransaction";
import useGetTransaction from "../../../hooks/transaction/useGetTransaction";
import useUpdateTransaction from "../../../hooks/transaction/useUpdateTransaction";
import TransactionFormSection from "./TransactionFormSection";

interface EditTransactionProps {
  isNew?: boolean;
}

export function mapTransactionToFormValues(
  tx: Transaction
): TransactionFormValues {
  return {
    id: tx.id,
    customer_id: tx.customer.id,
    amount: tx.amount,
    note: tx.note,
  };
}

export default function EditTransaction({
  isNew = false,
}: Readonly<EditTransactionProps>) {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customer")) || null;
  const navigate = useNavigate();

  const { customers } = useGetCustomers();
  const { transactionData, isLoading: transactionLoading } =
    useGetTransaction(isNew);
  const { createTransaction } = useCreateTransaction();
  const { updateTransaction } = useUpdateTransaction();

  const handleSubmit = async (
    values: TransactionFormValues,
    { setSubmitting }: FormikHelpers<TransactionFormValues>
  ) => {
    try {
      if (isNew) {
        const result = await createTransaction(values);
        if (result?.data?.id) {
          navigate(`/app/customer/${result.data.customer_id}`);
        } else {
          navigate("/app/customer");
        }
      } else {
        await updateTransaction(values);
        navigate(`/app/customer/${values.customer_id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) navigate("/app/customer");
    else if (customerId) navigate(`/app/customer/${customerId}`);
    else navigate(`/app/customer/${transactionData.customer.id}`);
  };

  // Prepare breadcrumbs
  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    transactionData
      ? {
          label: "Transactions",
          url: `/app/customer/${transactionData.customer.id}`,
        }
      : { label: "Transactions", url: "/app/customers" },
    {
      label: isNew ? "New Transaction" : `#${id?.toString()}`,
      url: isNew ? "" : `/app/customer/${customerId}`,
    },
  ];

  if (!isNew && transactionLoading) return <LoadingCircle />;

  const initialValues: TransactionFormValues = isNew
    ? {
        customer_id: transactionData.customer.id ?? 0,
        amount: 0,
        note: "Befizetés",
      }
    : mapTransactionToFormValues(transactionData as Transaction);

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Create Transaction" : `Edit: #${id?.toString()}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Transaction Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik<TransactionFormValues>
            initialValues={initialValues}
            validationSchema={TransactionSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <TransactionFormSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    customers={customers}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <FormActions
                    isSubmitting={isSubmitting}
                    onCancel={handleCancel}
                    submitText={isNew ? "Create transaction" : "Save"}
                    submittingText={
                      isNew ? "Creating transaction..." : "Saving..."
                    }
                  />
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
